import Link from 'next/link';

export default function Page() {
  return (
    <main style={{ backgroundImage: `url(${"/universe.jpg"})`, backgroundSize: 'cover' }} className="container-fluid text-center">

      <div className="row align-items-center vh-100">
        <div className="col-8 mx-auto">
          <div className='black-box'>
            <h1 className="page-title">
              The Search for Planet X
            </h1>

            <div className="d-grid col-6 mx-auto">
              <Link
                className='btn btn-outline-light btn-large btn-middle'
                href={{
                  pathname: '/game/start',
                  query: {
                    new: 'true'
                  }
                }}
              >New Game
              </Link>

              <Link
                className='btn btn-outline-light btn-large btn-middle'
                href={{
                  pathname: '/game/start',
                }}
              >
                Join Game
              </Link>
              <a href="https://cdn.1j1ju.com/medias/1c/fb/79-the-search-for-planet-x-rulebook.pdf" className="link-light page-text btn-bottom" target='_blank'>Rules</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}