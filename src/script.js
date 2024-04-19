var region="us-east-1"
var accessKeyId="AKIAVWXT5M3RDHWJ5ZAW";
var secretAccessKey="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";

AWS.config.update({
    region:region,
    credentials:new AWS.credentials(accessKeyId,secretAccessKey)
})

var s3=new AWS.S3()

function refreshFileList(bucketName){
    
}
refreshFileList("fileudr2203")