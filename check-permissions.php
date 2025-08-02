<?php
// Script to check file permissions
// Upload this file to your cPanel hosting and access it via browser

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Security check - only allow access from specific IPs
// Uncomment and add your IP to restrict access
/*
$allowed_ips = ['your.ip.address.here'];
if (!in_array($_SERVER['REMOTE_ADDR'], $allowed_ips)) {
    die('Access denied');
}
*/

// Function to get file permissions in human-readable format
function get_permissions($file) {
    $perms = fileperms($file);
    
    switch (true) {
        case ($perms & 0xC000) == 0xC000: // Socket
            $info = 's';
            break;
        case ($perms & 0xA000) == 0xA000: // Symbolic Link
            $info = 'l';
            break;
        case ($perms & 0x8000) == 0x8000: // Regular
            $info = '-';
            break;
        case ($perms & 0x6000) == 0x6000: // Block special
            $info = 'b';
            break;
        case ($perms & 0x4000) == 0x4000: // Directory
            $info = 'd';
            break;
        case ($perms & 0x2000) == 0x2000: // Character special
            $info = 'c';
            break;
        case ($perms & 0x1000) == 0x1000: // FIFO pipe
            $info = 'p';
            break;
        default: // Unknown
            $info = 'u';
    }
    
    // Owner
    $info .= (($perms & 0x0100) ? 'r' : '-');
    $info .= (($perms & 0x0080) ? 'w' : '-');
    $info .= (($perms & 0x0040) ?
                (($perms & 0x0800) ? 's' : 'x' ) :
                (($perms & 0x0800) ? 'S' : '-'));
    
    // Group
    $info .= (($perms & 0x0020) ? 'r' : '-');
    $info .= (($perms & 0x0010) ? 'w' : '-');
    $info .= (($perms & 0x0008) ?
                (($perms & 0x0400) ? 's' : 'x' ) :
                (($perms & 0x0400) ? 'S' : '-'));
    
    // World
    $info .= (($perms & 0x0004) ? 'r' : '-');
    $info .= (($perms & 0x0002) ? 'w' : '-');
    $info .= (($perms & 0x0001) ?
                (($perms & 0x0200) ? 't' : 'x' ) :
                (($perms & 0x0200) ? 'T' : '-'));
    
    return $info;
}

// Function to get numeric permissions
function get_numeric_permissions($file) {
    $perms = fileperms($file);
    return substr(sprintf('%o', $perms), -4);
}

// Function to check if permissions are correct
function check_permissions($file, $is_dir = false) {
    $numeric = get_numeric_permissions($file);
    
    // Directories should be 755, files should be 644
    $recommended = $is_dir ? '0755' : '0644';
    $status = ($numeric == $recommended) ? 'OK' : 'Warning';
    
    return [
        'path' => $file,
        'is_dir' => $is_dir,
        'permissions' => get_permissions($file),
        'numeric' => $numeric,
        'recommended' => $recommended,
        'status' => $status
    ];
}

// Function to scan directory recursively
function scan_directory($dir, $max_depth = 2, $current_depth = 0) {
    if ($current_depth >= $max_depth) {
        return [];
    }
    
    $results = [];
    
    // Check the directory itself
    $results[] = check_permissions($dir, true);
    
    // Check contents
    $files = scandir($dir);
    foreach ($files as $file) {
        if ($file == '.' || $file == '..') {
            continue;
        }
        
        $path = $dir . '/' . $file;
        
        if (is_dir($path)) {
            $results[] = check_permissions($path, true);
            
            // Recursively scan subdirectories
            if ($current_depth < $max_depth - 1) {
                $results = array_merge($results, scan_directory($path, $max_depth, $current_depth + 1));
            }
        } else {
            $results[] = check_permissions($path, false);
        }
    }
    
    return $results;
}

// Process form submission
$results = [];
$scan_path = '';
$max_depth = 2;

if (isset($_POST['check'])) {
    $scan_path = isset($_POST['path']) ? $_POST['path'] : '.';
    $max_depth = isset($_POST['depth']) ? intval($_POST['depth']) : 2;
    
    // Limit max depth for performance
    if ($max_depth > 5) {
        $max_depth = 5;
    }
    
    // Security check - prevent traversal
    $scan_path = realpath($scan_path);
    if ($scan_path === false) {
        $error = "Invalid path specified";
    } else {
        // Get the document root
        $doc_root = realpath($_SERVER['DOCUMENT_ROOT']);
        
        // Make sure we're not going outside the document root
        if (strpos($scan_path, $doc_root) !== 0) {
            $error = "Path must be within document root";
        } else {
            $results = scan_directory($scan_path, $max_depth);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Permission Checker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
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
        .ok {
            background-color: #dff0d8;
            color: #3c763d;
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
        input[type="text"], input[type="number"] {
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
        .error {
            color: #a94442;
            background-color: #f2dede;
            padding: 10px;
            border: 1px solid #ebccd1;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>File Permission Checker</h1>
    
    <form method="post">
        <p>This tool checks file permissions in your website directory.</p>
        <p>
            <label for="path">Directory to scan:</label><br>
            <input type="text" id="path" name="path" value="<?php echo htmlspecialchars($scan_path ?: '.'); ?>">
        </p>
        <p>
            <label for="depth">Scan depth (1-5):</label><br>
            <input type="number" id="depth" name="depth" min="1" max="5" value="<?php echo $max_depth; ?>">
        </p>
        <button type="submit" name="check">Check Permissions</button>
    </form>
    
    <?php if (isset($error)): ?>
        <div class="error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>
    
    <?php if (!empty($results)): ?>
        <h2>Results</h2>
        <p>Scanned directory: <?php echo htmlspecialchars($scan_path); ?></p>
        
        <table>
            <tr>
                <th>Path</th>
                <th>Type</th>
                <th>Current Permissions</th>
                <th>Numeric</th>
                <th>Recommended</th>
                <th>Status</th>
            </tr>
            <?php foreach ($results as $result): ?>
                <tr class="<?php echo strtolower($result['status']); ?>">
                    <td><?php echo htmlspecialchars($result['path']); ?></td>
                    <td><?php echo $result['is_dir'] ? 'Directory' : 'File'; ?></td>
                    <td><?php echo $result['permissions']; ?></td>
                    <td><?php echo $result['numeric']; ?></td>
                    <td><?php echo $result['recommended']; ?></td>
                    <td><?php echo $result['status']; ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
        
        <h2>Recommendations</h2>
        <p>To fix permissions on your cPanel hosting:</p>
        <ol>
            <li>Log in to your cPanel account</li>
            <li>Open the File Manager</li>
            <li>Navigate to the directory containing your website files</li>
            <li>Right-click on the file or directory you want to change</li>
            <li>Select "Change Permissions"</li>
            <li>Set permissions to:
                <ul>
                    <li>Directories: 755 (rwxr-xr-x)</li>
                    <li>Files: 644 (rw-r--r--)</li>
                </ul>
            </li>
        </ol>
        
        <h3>Using SSH (if available)</h3>
        <p>If you have SSH access, you can run these commands to fix permissions:</p>
        <pre>
# Fix directories
find <?php echo htmlspecialchars($scan_path); ?> -type d -exec chmod 755 {} \;

# Fix files
find <?php echo htmlspecialchars($scan_path); ?> -type f -exec chmod 644 {} \;
        </pre>
    <?php endif; ?>
</body>
</html> 