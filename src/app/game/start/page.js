'use client';

import CodeInput from '@/app/components/CodeInput'
import CodeGenerator from '@/app/components/CodeGenerator'
import Link from 'next/link';
import getRoomcode from '@/app/lib/roomgen'
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import getClientId from '@/app/lib/auth'

export default function Page({ searchParams }) {

    const [code, setCode] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            getClientId();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const submitData = { code: code, id: getClientId(), new: searchParams.new }

        try {
            const res = await fetch('http://localhost:3000/api/game/start', {
                method: 'POST',
                body: JSON.stringify(submitData),
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (res.ok) {
                window.location.href = `/game/${code}/board`;
            } else {
                alert("Oops! Something is wrong.")
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        if (searchParams.new) {
            setCode(getRoomcode());
        }
    }, [searchParams.new]);

    return (
        <div style={{ backgroundImage: `url(${"/universe.jpg"})`, backgroundSize: 'cover' }} className="container-fluid text-center">
            <div className='row align-items-center vh-100'>
                <div className='col-8 mx-auto'>
                    <div className='black-box'>
                        <form onSubmit={handleSubmit}>
                            <h1 className='page-title'>Welcome Explorer!</h1>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">

                                        {searchParams.new ? (
                                            <CodeGenerator code={code}></CodeGenerator>
                                        ) :
                                            (<CodeInput onCodeChange={(code) => { setCode(code) }}></CodeInput>)
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='d-grid col-3 mx-auto'>
                                <Button className='btn btn-small' variant="outline-light" type="submit">
                                    Join
                                </Button>
                                <Link className='btn btn-outline-light btn-small'
                                    href={{
                                        pathname: '/',
                                    }}
                                >
                                    Back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );

}