import { createContext, useState, useEffect } from "react";

export const FileContext = createContext();

const FileContextProvider = (props) => {
  const [files, setFiles] = useState([]);
  const [parentId, setParentId] = useState('root');
  const [breadcrumbs, setBreadcrumbs] = useState([{
    folder: 'My Drive',
    folderId: 'root',
    active: true
  }])

  useEffect(() => {
    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad() {
      window.gapi.load("client:auth2", () => {
        console.log("Client loaded!!");

        window.gapi.client.init({
          apiKey: "AIzaSyC3JqOLPmTmouQX9kBuKI0OfCYCnP1I9O4",
          clientId:
            "953904536832-f9n1591em77rroae9uokdp439qluifmm.apps.googleusercontent.com",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/drive.metadata",
        });

        window.gapi.client.load("drive", "v3", () => {
          console.log("Load files...");
          listFiles();
        });
      });
    }
    //   On app render call
    handleClientLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Print files.
   */
  function listFiles(fId) {
    fId = fId ? fId : 'root';
    window.gapi.client.drive.files.list({
      'q': `'${fId}' in parents and trashed=false`,
      'pageSize': 100,
      'fields': "nextPageToken, files(id, name, mimeType, thumbnailLink, parents, webContentLink, webViewLink)"
    }).then(function (response) {
      setFiles(response.result.files);
    });
  }

  // Search files
  function searchFiles(searchTerm) {
    window.gapi.client.drive.files.list({
      'q': `name contains '${searchTerm}'`,
      'pageSize': 100,
      'fields': "nextPageToken, files(id, name, mimeType, thumbnailLink, parents)"
    }).then(function (response) {
      setFiles(response.result.files);
    });
  }

  function deleteFile(fileId) {
    var request = window.gapi.client.drive.files.delete({
      'fileId': fileId
    });
    request.execute(function (resp) {
      let filteredFiles = files.filter((file) => file.id !== fileId);
      setFiles(filteredFiles);
    });
  }

  function uploadFile(fileData, parentId) {
    var fileContent = fileData.content; // As a sample, upload a text file.
    var file = new Blob([fileContent], { type: 'text/plain' });
    var metadata = {
      'name': fileData.name, // Filename at Google Drive
      'mimeType': 'text/plain', // mimeType at Google Drive
      'parents': [parentId], // Folder ID at Google Drive
    };

    var accessToken = window.gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';
    xhr.onload = () => {
      console.log(xhr.response.id); // Retrieve uploaded file ID.
      listFiles(parentId);
    };
    xhr.send(form);
  }

  function createFolder(parentIds, folderName) {
    var fileMetadata = {
      'name': folderName,
      'mimeType': 'application/vnd.google-apps.folder',
      'parents': parentIds
    };
    window.gapi.client.drive.files.create({
      resource: fileMetadata,
    }).then(function (response) {
      switch (response.status) {
        case 200:
          var file = response.result;
          console.log('Created Folder Id: ', file.id);
          setFiles([...files, file]);
          break;
        default:
          console.log('Error creating the folder, ' + response);
          break;
      }
    });
  }

  return (
    <FileContext.Provider value={{ files, listFiles, deleteFile, createFolder, parentId, setParentId, breadcrumbs, setBreadcrumbs, uploadFile, searchFiles }}>
      {props.children}
    </FileContext.Provider>
  )
}

export default FileContextProvider;