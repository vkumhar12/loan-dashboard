const DocumentUpload = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Document Upload</h3>
      <input
        type="file"
        className="w-full p-3 mb-4 border border-gray-300 rounded"
      />
      <input
        type="file"
        className="w-full p-3 mb-4 border border-gray-300 rounded"
      />
    </div>
  );
};

export default DocumentUpload;
