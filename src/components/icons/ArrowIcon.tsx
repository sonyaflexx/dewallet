interface ArrowIconProps {
  direction: 'Up' | 'Down' | 'Left' | 'Right';
};

const ArrowIcon: React.FC<ArrowIconProps> = ({ direction }) => {
  const rotation = {
    Up: 'rotate(0deg)',
    Down: 'rotate(180deg)',
    Left: 'rotate(270deg)',
    Right: 'rotate(90deg)',
  };

  return (
    <div style={{ transform: rotation[direction], display: 'inline-block' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="22" fill="#007AFF"></rect>
        <path fillRule="evenodd" clipRule="evenodd" d="M22 30C21.4299 30 20.9677 29.5691 20.9677 29.0376V17.2859L15.7622 22.1392C15.3591 22.515 14.7055 22.515 14.3023 22.1392C13.8992 21.7633 13.8992 21.154 14.3023 20.7781L21.2701 14.2819C21.6732 13.906 22.3268 13.906 22.7299 14.2819L29.6977 20.7781C30.1008 21.154 30.1008 21.7633 29.6977 22.1392C29.2945 22.515 28.6409 22.515 28.2378 22.1392L23.0323 17.2859V29.0376C23.0323 29.5691 22.5701 30 22 30Z" fill="white"></path>
      </svg>
    </div>
  );
};

export default ArrowIcon;