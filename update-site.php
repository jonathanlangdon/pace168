<?php
    $secret = 'Heckyeahwewantssecrets385';
    $signature = 'sha256=' . hash_hmac('sha256', file_get_contents('php://input'), $secret);

    // Verify the request signature
    if (!hash_equals($signature, $_SERVER['HTTP_X_HUB_SIGNATURE_256'])) {
        http_response_code(403);
        die('Invalid signature');
    }

    // Define the path to your git repository
    $repoPath = '/home/newhulings/public_html/pace168.com';

    // Change directory to the repository
    if (!chdir($repoPath)) {
        error_log("Failed to change directory to $repoPath");
        http_response_code(500);
        die('Failed to change directory');
    }

    // Pull the latest changes
    $command = 'git pull 2>&1';
    exec($command, $output, $return);

    // Output the result for logging purposes
    $logFile = '/home/newhulings/logs/gitPace168WebHookLog.log'; // Change this to your desired log file path
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - Command: $command\n", FILE_APPEND);
    file_put_contents($logFile, "Output: " . implode("\n", $output) . "\n", FILE_APPEND);
    file_put_contents($logFile, "Return Code: $return\n", FILE_APPEND);

    if ($return === 0) {
        echo "Git Pull Successful: " . implode("\n", $output);
    } else {
        echo "Git Pull Failed: " . implode("\n", $output);
    }
?>
