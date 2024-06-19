const path = require('path');
const { v4: uuid } = require('uuid');

function uploadFile(files, validFileTypes = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) {
    return new Promise( (resolve, reject) => {

        if (!files) {
            return reject('No files to upload.');
        }

        const { file } = files;
        const splitName = file.name.split('.');
        const extension = splitName[splitName.length - 1];

        if (!validFileTypes.includes(extension)) {
            return reject(`File type "${extension}" is not valid. Use "${validFileTypes}".`)
        }

        const tempName = uuid() + '.' + extension;

        uploadPath = path.join(__dirname, '../uploads/', folder,tempName);

        file.mv(uploadPath, function (err) {
            if (err) {
                return reject(err)
            }

            resolve(tempName)
        });
    })
}

module.exports = {
    uploadFile,
}