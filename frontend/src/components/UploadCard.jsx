function UploadCard({ image, setImage, handleScan }) {
  return (
    <div className="space-y-6">

      {/* Upload Area */}
      <label className="block w-full cursor-pointer border-2 border-dashed border-green-300 rounded-2xl p-8 text-center bg-green-50 hover:bg-green-100 transition">

        <div className="text-5xl mb-3">🌿</div>

        <h3 className="text-lg font-semibold text-slate-800">
          Upload Plant Image
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          JPG, PNG or JPEG
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
        />
      </label>

      {/* Preview */}
      {image && (
        <div className="overflow-hidden rounded-2xl border border-green-100">
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-full h-72 object-cover"
          />
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleScan}
        className="
          w-full
          py-4
          rounded-2xl
          bg-green-600
          hover:bg-green-700
          text-white
          font-semibold
          text-lg
          shadow-lg
          transition-all
          duration-300
        "
      >
        🔍 Scan Plant
      </button>

    </div>
  );
}

export default UploadCard;