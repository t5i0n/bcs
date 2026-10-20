<?php
// Lives OUTSIDE public_html. Never commit this file.
return [
    // Generate with:  openssl rand -hex 32   (or any 64+ char random string)
    'jwt_secret'     => 'PASTE_NEW_SECRET_HERE',
    'jwt_expiration' => 7 * 24 * 60 * 60,

    // Defaults to ../bcs-private/app.db when omitted
    // 'db_path' => '/home/bcscofmw/domains/bcscoffeeconsulting.com/bcs-private/app.db',

    // Only needed if another origin calls the API (e.g. http://localhost:5173 for local dev)
    'allowed_origins' => [],
];