<?php
// Script to check for 403 errors on a website
// Upload this file to your cPanel hosting and access it via browser

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuration
$base_url = 'https://fablab-cfyi.uz';
$googlebot_user_agent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

// URLs to check
$urls_to_check = [
    '/',
    '/mould',
    '/digital-fabrication',
    '/digital-fabrication/precision-manufacturing',
    '/courses',
    '/3d-scanning',
    '/3d-printing',
    '/blog',
    '/blog/3d-printing-innovations',
    '/en/',
    '/uz/',
    '/ru/'
];

// Function to check URL status
function check_url($url, $user_agent) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    
    curl_close($ch);
    
    return [
        'url' => $url,
        'status' => $http_code,
        'ok' => ($http_code >= 200 && $http_code < 400),
        'error' => $error
    ];
}

// Check if form was submitted
$results = [];
if (isset($_POST['check'])) {
    // Check each URL
    foreach ($urls_to_check as $path) {
        $url = $base_url . $path;
        $results[] = check_url($url, $googlebot_user_agent);
    }
    
    // Check custom URL if provided
    if (!empty($_POST['custom_url'])) {
        $custom_url = $_POST['custom_url'];
        if (strpos($custom_url, 'http') !== 0) {
            $custom_url = $base_url . $custom_url;
        }
        $results[] = check_url($custom_url, $googlebot_user_agent);
    }
}

// HTML output
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 Error Checker for fablab-cfyi.uz</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .success {
            background-color: #dff0d8;
            color: #3c763d;
        }
        .error {
            background-color: #f2dede;
            color: #a94442;
        }
        .warning {
            background-color: #fcf8e3;
            color: #8a6d3b;
        }
        form {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
        }
        input[type="text"] {
            padding: 8px;
            width: 300px;
        }
        button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <h1>403 Error Checker for fablab-cfyi.uz</h1>
    
    <form method="post">
        <p>This tool checks your website pages for 403 errors using a Googlebot user agent.</p>
        <p>
            <label for="custom_url">Check custom URL (optional):</label><br>
            <input type="text" id="custom_url" name="custom_url" placeholder="e.g., /your-page or full URL">
        </p>
        <button type="submit" name="check">Check for 403 Errors</button>
    </form>
    
    <?php if (!empty($results)): ?>
        <h2>Results</h2>
        <table>
            <tr>
                <th>URL</th>
                <th>Status Code</th>
                <th>Result</th>
            </tr>
            <?php foreach ($results as $result): ?>
                <tr class="<?php echo $result['ok'] ? 'success' : ($result['status'] == 403 ? 'error' : 'warning'); ?>">
                    <td><?php echo htmlspecialchars($result['url']); ?></td>
                    <td><?php echo $result['status']; ?></td>
                    <td>
                        <?php if ($result['ok']): ?>
                            OK
                        <?php elseif ($result['status'] == 403): ?>
                            Forbidden (403)
                        <?php elseif ($result['status'] == 404): ?>
                            Not Found (404)
                        <?php else: ?>
                            Error: <?php echo htmlspecialchars($result['error'] ?: 'HTTP ' . $result['status']); ?>
                        <?php endif; ?>
                    </td>
                </tr>
            <?php endforeach; ?>
        </table>
        
        <h2>Recommendations</h2>
        <?php
        $has_403 = false;
        foreach ($results as $result) {
            if ($result['status'] == 403) {
                $has_403 = true;
                break;
            }
        }
        
        if ($has_403):
        ?>
            <p>Some pages are returning 403 Forbidden errors. Here are possible solutions:</p>
            <ol>
                <li>Check file permissions: Make sure your files have the correct permissions (644 for files, 755 for directories).</li>
                <li>Check .htaccess configuration: Ensure your .htaccess file doesn't have restrictive rules.</li>
                <li>Contact your hosting provider: Ask if they have any security measures blocking Googlebot.</li>
                <li>Check for IP restrictions: Make sure Google's IP ranges aren't blocked.</li>
                <li>Review server logs: Check error logs in cPanel for more specific information.</li>
            </ol>
        <?php else: ?>
            <p>No 403 errors detected! If you're still having issues with Google indexing, consider:</p>
            <ol>
                <li>Submit your sitemap to Google Search Console</li>
                <li>Request reindexing of specific URLs</li>
                <li>Check for other issues like robots.txt restrictions or noindex tags</li>
            </ol>
        <?php endif; ?>
    <?php endif; ?>
    
    <h2>How to Fix 403 Errors</h2>
    <p>If you're experiencing 403 errors, try these steps:</p>
    <ol>
        <li><strong>Update your .htaccess file</strong> with the configuration provided to you</li>
        <li><strong>Check file permissions</strong> in cPanel File Manager:
            <ul>
                <li>HTML/CSS/JS files should be 644</li>
                <li>Directories should be 755</li>
                <li>In cPanel File Manager, right-click on a file/folder and select "Change Permissions"</li>
            </ul>
        </li>
        <li><strong>Contact your hosting provider</strong> to check for server-level restrictions</li>
    </ol>
</body>
</html> 