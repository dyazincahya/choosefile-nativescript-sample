<?php
	include("func.php");
	$action = (isset($_GET["action"])) ? (empty($_GET["action"]) ? "list" : $_GET["action"]) : "list";

	if($action == "list"){
		$files = query_get("SELECT * FROM files ORDER BY file_id DESC");
		if (count($files) > 0) {
		    $response = array(
		    	"success" 	=> true,
		    	"data" 		=> $files,
		    	"count" 	=> count($files)
		    );

		    echo json_encode($response);
		} else {
		    $response = array(
		    	"success" 	=> true,
		    	"data" 		=> [],
		    	"count" 	=> 0
		    );

		    echo json_encode($response);
		}

	}

	if($action == "add"){
		$messageFail = array();

		$target_dir = "uploads/";
		$target_file = $target_dir . basename($_FILES["attachment"]["name"]);
		$uploadOk = 1;
		$FileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
		// Check if file already exists
		if (file_exists($target_file)) {
			array_push($messageFail, "File already exists!");
		    $uploadOk = 0;
		}
		// Check file size, max 5MB
		if ($_FILES["attachment"]["size"] > 5000000) {
		    array_push($messageFail, "Your file is too large!");
		    $uploadOk = 0;
		}
		// Allow certain file formats
		if($FileType != "jpg" && $FileType != "png" && $FileType != "jpeg"
		&& $FileType != "gif" && $FileType != "pdf") {
			array_push($messageFail, "Only (JPG/JPEG/PNG/GIF/PDF) files are allowed!");
		    $uploadOk = 0;
		}
		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
			$response = array(
	    		'success' => false,
	    		'message' => $messageFail
	    	);

	    	echo json_encode($response);
		// if everything is ok, try to upload file
		} else {
			$file_name = db()->real_escape_string($_FILES["attachment"]["name"]);
			$file_size = db()->real_escape_string($_FILES["attachment"]["size"]);
			$file_mime = db()->real_escape_string($_FILES["attachment"]["type"]);
			$file_exts = db()->real_escape_string($FileType);

		    if (move_uploaded_file($_FILES["attachment"]["tmp_name"], $target_file)) {
		    	$sql = "INSERT INTO files (file_name, file_size, file_mime, file_ext) VALUES ('$file_name', '$file_size', '$file_mime', '$file_exts')";
		    	query_raw($sql);
		    	
		    	$response = array(
		    		'success' => true,
		    		'message' => array("The file ". basename( $_FILES["attachment"]["name"]). " has been uploaded!")
		    	);

		    	echo json_encode($response);
		    } else {
		        $response = array(
		    		'success' => false,
		    		'message' => array('There was an error uploading your file!')
		    	);

		    	echo json_encode($response);
		    }
		}
	}