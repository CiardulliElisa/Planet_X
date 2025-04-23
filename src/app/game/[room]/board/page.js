import Spacemap from '@/app/components/spacemap';
import History from '@/app/components/History';

export default function Page({ }) {

    return (
        <main style={{ backgroundImage: `url(${"/universe.jpg"})`, backgroundSize: 'cover' }} >
            <div className="container-fluid text-center d-flex justify-content-center align-items-center vh-100 black-box" >
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col mx-auto">
                                <Spacemap />
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-11 mx-auto scrollable">
                                <History />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}
