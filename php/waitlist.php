<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, string $message): never
{
    http_response_code($status);
    echo json_encode(['message' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Please submit the contact form.');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !(PHP_SAPI === 'cli-server' && $origin === 'http://127.0.0.1:3111') && !in_array($origin, ['https://anomx.io', 'https://www.anomx.io'], true)) {
    respond(403, 'Request origin is not allowed.');
}
if (!str_starts_with(strtolower($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json')) {
    respond(415, 'Please send JSON.');
}
$raw = file_get_contents('php://input', false, null, 0, 12001);
if ($raw === false || strlen($raw) > 12000) {
    respond(413, 'Request too large.');
}
try {
    $body = json_decode($raw, false, 32, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, 'Please send a valid request.');
}
if (!is_object($body)) {
    respond(400, 'Please send a valid request.');
}
$values = [];
foreach (['fullName' => 600, 'email' => 254, 'company' => 800, 'useCase' => 16000, 'website' => 2000] as $key => $maxBytes) {
    $value = $body->$key ?? '';
    if (!is_string($value) || strlen($value) > $maxBytes) {
        respond(400, 'Please check your form details.');
    }
    $values[$key] = trim($value);
}
if ($values['website'] !== '') {
    respond(200, 'Thanks. Your request has been received.');
}
if ($values['fullName'] === '' || $values['company'] === '' || !filter_var($values['email'], FILTER_VALIDATE_EMAIL)
    || preg_match('/[\r\n]/', $values['email'] . $values['fullName'] . $values['company'])) {
    respond(400, 'Please include your name, work email, and organization.');
}

// This path is outside build/, which must be the domain's document root.
$privateDir = dirname(__DIR__, 2) . '/.private';
$configPath = $privateDir . '/mail.php';
if (!is_file($configPath)) {
    respond(503, 'Email delivery is temporarily unavailable. Please contact hello@anomx.io.');
}

try {
    $config = require $configPath;
    foreach (['host', 'username', 'password', 'from_email', 'recipient_email'] as $key) {
        if (!is_array($config) || !is_string($config[$key] ?? null) || $config[$key] === '') {
            respond(503, 'Email delivery is temporarily unavailable. Please contact hello@anomx.io.');
        }
    }

    // A single locked, bounded file avoids unbounded per-address files. No raw IP
    // addresses are stored. Expired counters are removed on every submission.
    $rateFile = fopen($privateDir . '/waitlist-rate-limit.json', 'c+');
    if (!$rateFile || !flock($rateFile, LOCK_EX)) {
        throw new RuntimeException('Rate limit unavailable');
    }
    chmod($privateDir . '/waitlist-rate-limit.json', 0600);
    $counters = json_decode(stream_get_contents($rateFile) ?: '{}', true);
    $counters = is_array($counters) ? $counters : [];
    $now = time();
    foreach ($counters as $key => $counter) {
        if (($counter['until'] ?? 0) <= $now) {
            unset($counters[$key]);
        }
    }
    $client = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown', $config['password']);
    $limits = ['global' => [100, 3600], $client => [5, 900]];
    foreach ($limits as $key => [$limit, $window]) {
        if (($counters[$key]['count'] ?? 0) >= $limit) {
            flock($rateFile, LOCK_UN);
            fclose($rateFile);
            header('Retry-After: ' . max(1, $counters[$key]['until'] - $now));
            respond(429, 'Please wait before sending another request, or email hello@anomx.io.');
        }
        $counters[$key] = [
            'count' => ($counters[$key]['count'] ?? 0) + 1,
            'until' => $counters[$key]['until'] ?? $now + $window,
        ];
    }
    rewind($rateFile);
    ftruncate($rateFile, 0);
    fwrite($rateFile, json_encode($counters, JSON_THROW_ON_ERROR));
    fflush($rateFile);
    flock($rateFile, LOCK_UN);
    fclose($rateFile);

    require __DIR__ . '/vendor/autoload.php';
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->Port = (int) ($config['port'] ?? 465);
    $mail->SMTPSecure = ($config['encryption'] ?? 'ssl') === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->Timeout = 15;
    $mail->getSMTPInstance()->Timelimit = 20;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom($config['from_email'], $config['from_name'] ?? 'Anomx');
    $mail->addAddress($config['recipient_email']);
    $mail->addReplyTo($values['email'], $values['fullName']);
    $mail->Subject = 'Anomx early access — ' . $values['company'];
    $mail->Body = "New Anomx early-access request\n\n"
        . "Name: {$values['fullName']}\nEmail: {$values['email']}\nOrganization: {$values['company']}\n\n"
        . "{$values['useCase']}\n\nSubmitted: " . gmdate('c');
    $mail->send();
    respond(200, 'Thanks. Your request has been sent to the Anomx inbox.');
} catch (Throwable $error) {
    // Do not put SMTP credentials or visitor details into public responses/logs.
    error_log('Anomx waitlist delivery failed (' . get_class($error) . ').');
    respond(503, 'Email delivery is temporarily unavailable. Please contact hello@anomx.io.');
}
