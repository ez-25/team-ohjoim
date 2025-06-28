import styles from '@/styles/AlbumCard.module.css';

interface Album {
  title: string;
  artist: string;
  releaseDate: string;
  thumbnail: string;
}

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const { title, artist, releaseDate, thumbnail } = album;

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="flex flex-col items-center justify-center w-[90%] h-[90%] border-2 border-purple-400 rounded-lg bg-purple-50 p-1 shadow-md cursor-pointer"
        onClick={() => console.log('선택된 앨범:', title)}
      >
        {/* 텍스트 */}
        <h2 className="text-lg font-bold text-purple-900 mb-2">{title}</h2>

        <div className="flex flex-col items-center gap-2 p-4">
          {/* CD 모양 */}
          <div className={`${styles.spinOnHover} relative w-80 h-80 rounded-full border-2 border-purple-400 overflow-hidden shadow-lg`}>
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover rounded-full"
            />
            {/* CD 중심 구멍 */}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full border-2 border-purple-400 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-xs text-purple-700 text-center mt-2">
            {artist}<br />
            {releaseDate}
          </div>
        </div>
      </div>
    </div>
  );
}