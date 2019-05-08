function uploadInfo() {
  return fetch('/.netlify/functions/upload')
  .then(response => {
    return response.json();
  })
}

// imageFile must be a File object, e.g. document.getElementById('imageInput').files[0]
// https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_api
async function uploadImage(imageFile) {
  var apiInfo = await uploadInfo();

  var formData = new FormData();
  formData.append('file', imageFile);
  formData.append('timestamp', apiInfo.timestamp);
  formData.append('signature', apiInfo.signature);
  formData.append('api_key', apiInfo.apiKey);

  var data = await fetch(apiInfo.apiUrl, {
    method: 'post',
    body: formData
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    return data;
  }).catch(error => {
    console.log(error);
  });

  return data;
}