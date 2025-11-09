/**
 * Announcement banner component
 */
const AnnouncementBanner: React.FC = () => {
  return (
    <div>
      <p className="mb-2 py-4 text-center bg-gradient-to-r from-cyanGreen-800 to-cyan-800 text-white">
        🚀 Get 100 free credits when you sign up today!{" "}
        <a href="/login" className="underline font-semibold hover:text-gray-100">Start building</a>
      </p>
    </div>
  );
};

export default AnnouncementBanner;