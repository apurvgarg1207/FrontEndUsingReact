import { useEffect, useState } from "react"

export default function UploadDisplay({ onImageUpload , imageBytes}) {
    const [image, setImage] = useState(null);
    // Use useEffect to set the image when the imageURL prop changes
    useEffect(() => {
        console.log("Image Byte :-",imageBytes.length);
        
        if (!imageBytes.length==0) {
            // console.log("Image Url",imageBytes);
            setImage(`data:image/jpeg;base64,${imageBytes}`);
            // console.log("Image :--- ",image);
            imageBytes=null;
        }
    }, [imageBytes]);


    const handleImageUpload = (event) => {
       
        const file = event.target.files[0];

        if (file) {

            // setImage('');
            console.log("Image :-",image);
            const reader = new FileReader();
            reader.onload = (e) => {
                // setImage(e.target.result);
                const imageData = e.target.result; // Base64-encoded image data
                const imageName = file.name; // Get the filename
                // const imageFile = file; // Get the filename
                console.log("Image Check",image);
                setImage(`${imageData}`);
                console.log("image Data ",image);
                // console.log("Image ",imageFile);
                // onImageUpload(file); // Call the parent component's callback function
                onImageUpload(file); // Call the parent component's callback function
                // onImageFile(imageFile);
            };
            reader.readAsDataURL(file);
        }

    };
    return (
        <div className="container-fluid bg-coral vh-100 d-flex justify-content-center align-items-center">
            <div className="row h-custom">
                <div className="card text-center p-3 mx-auto col-8 col-md-8 col-lg-6 col-xl-10 bg-darkcoral">
                    <div className="card card-body" style={{ width: '100%', height: '100%' }}>
                        {image && (
                            <div>
                                <img src={image} alt="Upload" className="img-fluid rounded" />
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-center">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="btn btn-coral"
                            id="file-input"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

    