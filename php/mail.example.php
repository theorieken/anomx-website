<?php
// Copy to .private/mail.php beside build/, outside the domain webroot.
// Never commit the real file or copy it into build/.
return [
    'host' => 'w0130bf4.kasserver.com',
    'port' => 465,
    'encryption' => 'ssl',
    'username' => '',
    'password' => '',
    'from_email' => 'hello@anomx.io',
    'from_name' => 'Anomx',
    'recipient_email' => 'hello@anomx.io',
];
