/*global ergo*/
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Bounce } from 'react-reveal';
import TopNavbar from '../MenuBar/TopNavbar';
import MintModal from '../MintModal/MintModal';
// import './Home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [parameters, setParams] = useState([]);
    const [uniqueHash, setUniqueHash] = useState([]);
    const [ergoPay, setErgoPay] = useState(false);

    let refHash = 'initial';

    const setRefHash = hash => {
        setUniqueHash(hash);
        refHash = hash;
    };

    useEffect(() => {
        const getParams = async () => {
            const data = await fetch('https://auth.ergosapiens.com/info').then(response => response.json());
            setParams(data);
        };
        getParams();
    }, []);

    const apiValues = async () => {
        const getRefHash = async () => {
            const data = await fetch('https://api.ergosapiens.com/hash').then(response => response.json());
            return data.Hash;
        };
        await getRefHash().then(response => setRefHash(response));
        console.log('api is getting called: ', refHash);

        const getParams = async () => {
            const data = await fetch('https://auth.ergosapiens.com/info').then(response => response.json());
            setParams(data);
        };
        await getParams();
    };

    const checkQrSubmittion = uuid => {
        var counter = 0;
        const checker = setInterval(async function () {
            const data = await fetch(`https://ergopay.ergosapiens.com/response/${uuid}`).then(response => response.json());
            counter = counter + 1;
            if (data.tx_hash !== 'None' || counter === 30) {
                stopChecker(checker);
                if (data.tx_hash !== 'None') {
                    txSubmmited(uuid, data.tx_hash);
                    trackNFT(uuid);
                }
            } else {
            }
        }, 3000);
    };

    const trackNFT = uuid => {
        const checker = setInterval(async function () {
            const data = await fetch(`https://status.ergosapiens.com/nft_tx/${uuid}`).then(response => response.json());
            if (data.tx_hash !== 'None') {
                stopChecker(checker);
                NFT_incoming_noti(uuid, data.tx_hash);
            } else {
                console.log('checking for incoming NFTs');
            }
        }, 3000);
    };
    const stopChecker = checker => {
        clearInterval(checker);
    };

    const handleMintButton = async () => {
        await apiValues();
        if (parameters.button1 === 'true') {
            if (ergoPay) {
                setShowModal(true);
                checkQrSubmittion(refHash);
            } else {
                mintDapp();
            }
        } else {
            toast.error('Minting is disabled', noti_option_close('mint-disabled'));
        }
    };

    const noti_option = {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
    };
    const noti_option_close = id => {
        const data = {
            toastId: id,
            position: 'top-right',
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            hideProgressBar: true,
            autoClose: 3000,
            theme: 'dark',
        };
        return data;
    };
    const txSubmmited = (ref_hash, txHash) =>
        toast.success(`Transaction submitted (click me) Remember your unique hash: ${ref_hash}`, {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'dark',
            onClick: props => window.open(`https://explorer.ergoplatform.com/en/transactions/${txHash}`, '_blank'),
        });

    const NFT_incoming_noti = (ref_hash, txHash) =>
        toast.success(`NFT for hash: ${ref_hash} is on its way (click me)`, {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'dark',
            onClick: props => window.open(`https://explorer.ergoplatform.com/en/transactions/${txHash}`, '_blank'),
        });
    const mintDapp = async () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.open(`ergopay://ergopay.ergosapiens.com/ergopay/${parameters.address}/#P2PK_ADDRESS#/${parameters.amount}/${refHash}`);
        }
        const isConnected = async () => {
            if (!window.ergoConnector) {
                return false;
            }
            return await window.ergoConnector.nautilus.isConnected();
        };
        const ref = 'Ergo Payment Portal';
        if (await isConnected()) {
            try {
                const nftCost = parseFloat(parameters.amount);
                if ((await ergo.get_balance()) > nftCost * 10 ** 9) {
                    const txBuilding_noti = toast.loading('Please wait...', noti_option);
                    const tx = await fetch('https://api.dappstep.com/build_tx', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            config: [
                                {
                                    funds: {
                                        ERG: nftCost * 10 ** 9,
                                        tokens: [],
                                    },
                                    toAddress: parameters.address,
                                    additionalRegisters: {
                                        R4: { type: 'ByteArray', value: refHash },
                                        R5: { type: 'ByteArray', value: ref },
                                    },
                                },
                            ],
                            userAddress: await ergo.get_change_address(),
                        }),
                    }).then(resp => resp.json());

                    const { unsignedTx } = tx;
                    toast.update(txBuilding_noti, { render: 'Sign your transaction', type: 'success', isLoading: false, autoClose: true });

                    const signedTx = await ergo.sign_tx(unsignedTx);

                    const hash = await ergo.submit_tx(signedTx);
                    toast.dismiss();
                    txSubmmited(refHash, hash);
                    trackNFT(refHash);
                } else {
                    toast.warn(`At least ${parseFloat(parameters.amount)} ERG required for mint`, noti_option_close('min-ERG-required'));
                }
            } catch (error) {
                toast.dismiss();
                toast.warn('Please try again', noti_option_close('try-again'));
                console.log(error);
            }
        } else {
            toast.error('Connect your wallet first', noti_option_close('connect-wallet'));
        }
    };
    return (
        <div className="main-container">
            <ToastContainer />
            {/* <MenuBar /> */}
            <TopNavbar ergopay={[ergoPay, setErgoPay]} />
            {/* banner Img section*/}
            <div className="d-flex justify-content-center">
                <Image className="banner-img" src="https://i.ibb.co/LQvvR1R/1-ergosapiens-banner-v3.png" alt="this is img" width="940" height="300" />
            </div>

            {/* added Bounce animations */}
            <Bounce top>
                {/* Ergo Sapiens about section */}
                <Container className="ergo-about-container" id="home">
                    <Row className="d-flex justify-content-center ">
                        <Col sm={12} md={5} lg={5}>
                            <Image className="img-fluid" src="https://i.ibb.co/XFGN7Kg/topsecret4.png" alt="" width="545" height="545" />
                        </Col>
                        <Col sm={12} md={7} lg={6} className="d-flex align-items-center">
                            <div className="ergo-section">
                                <h1 className="ergo-title">ErgoSapiens</h1>
                                <p>In the post-apocalyptic world these ErgoSapiens rule the galaxy!</p>

                                <p>These are a collection of 500 NFTs on the Ergo Blockchain. They are the first of their kind.</p>

                                <p>Catch them for their declassification</p>
                                {/* mint button section */}
                                <div className="d-flex justify-content-center mt-5">
                                    <button
                                        className="btn-mint"
                                        onClick={async () => {
                                            await handleMintButton();
                                        }}
                                    >
                                        Mint
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Bounce>
            {/* mind modal component */}
            <MintModal modalProps={[showModal, setShowModal]} hashProps={uniqueHash} paramProps={[parameters, setParams]} />
        </div>
    );
};

export default Home;
