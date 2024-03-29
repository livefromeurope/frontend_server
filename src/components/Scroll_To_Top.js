import {useEffect} from 'react';

export default function Scroll_To_Top() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div>

      {/* 👇️ scroll to top on button click */}
      <button
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
        style={{
          position: 'fixed',
          padding: '0.1rem 0.5rem',
          fontSize: '20px',
          bottom: '50px',
          right: '40px',
          'borderRadius': '20px',
          'borderColor': '#fffff',
          backgroundColor: 'transparent',
          color: '#ffff',
          'fontSize': '14px',
          textAlign: 'center',
        }}
      >
        ↑
      </button>
    </div>
  );
}
