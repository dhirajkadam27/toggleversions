import { useEffect, useRef, useState } from 'react';
import './index.css';
import Nav from './Nav';
import { IoIosAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import axios from 'axios';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './CreateNewSite.css';

import * as ContextMenu from '@radix-ui/react-context-menu';
import './Context.css';


function Sites() {
    const { id } = useParams();
    const [sites, setSites] = useState([]);
    const [changes, setChanges] = useState(1);
    const nameRef = useRef(null);
    const renameRef = useRef(null);



    useEffect(
        () => {
            if (localStorage.getItem('userid')) {
                axios.post('http://localhost:8080/api/v1/auth/sites', {
                    userid: id
                }).then((result) => {
                    console.log(result.data);
                    if (result.data.message === "found") {
                        setSites(result.data.sites);
                    } else if (result.data.message === "Yet no sites are created") {
                        setSites([]);
                    }
                })
            }
        },
        [id, changes]
    );

    const createSite = () => {
        axios.post('http://localhost:8080/api/v1/auth/createsite', {
            name: nameRef.current.value,
            userid: id
        }).then((result) => {
            console.log(result.data);
            if (result.data.message === "Created") {
                setChanges(changes + 1);
            }
        })
    }

    const deleteSite = (siteid) => {
        axios.post('http://localhost:8080/api/v1/auth/deletesite', {
            _id: siteid
        }).then((result) => {
            console.log(result.data);
            if (result.data.message === "Deleted") {
                setChanges(changes + 1);
            }
        })
    }

    const renameSite = (siteid) => {
        axios.post('http://localhost:8080/api/v1/auth/renamesite', {
            _id: siteid,
            name: renameRef.current.value
        }).then((result) => {
            console.log(result.data);
            if (result.data.message === "Renamed") {
                setChanges(changes + 1);
            }
        })
    }


    const duplicateSite = (siteid) => {
        axios.post('http://localhost:8080/api/v1/auth/duplicateSite', {
            _id: siteid
        }).then((result) => {
            console.log(result.data);
            if (result.data.message === "Duplicate") {
                setChanges(changes + 1);
            }
        })
    }




    return (
        <div className="Sites">
            <Nav />
            <div className='title'>Sites</div>

            <div>
                <div className='siteboxs'>

                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <div className='createsite'>
                                <IoIosAdd />
                                <div className='text'>Create new site</div>
                            </div>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="DialogOverlay" />
                            <Dialog.Content className="DialogContent">
                                <Dialog.Title className="DialogTitle">Create New Site</Dialog.Title>
                                <Dialog.Description className="DialogDescription">
                                    Enter your Site name here and started building.
                                </Dialog.Description>
                                <fieldset className="Fieldset">
                                    <input ref={nameRef} className="Input" id="name" placeholder='Site name' />
                                </fieldset>
                                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                    <Dialog.Close asChild>
                                        <button onClick={createSite} className="Button green">Save changes</button>
                                    </Dialog.Close>
                                </div>
                                <Dialog.Close asChild>
                                    <button className="IconButton" aria-label="Close">
                                        <Cross2Icon />
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>



                    {sites.map(user => (


<Dialog.Root>
                        <ContextMenu.Root>
                            <ContextMenu.Trigger className="ContextMenuTrigger">
                                <div className='box'>
                                    <button></button>
                                    <div className='title'>{user.name}</div>
                                    <div className='Subtitle'>Edited 2min ago</div>
                                </div>
                            </ContextMenu.Trigger>
                            <ContextMenu.Portal>
                                <ContextMenu.Content className="ContextMenuContent" sideOffset={5} align="end">
                                    <ContextMenu.Item onClick={() => window.location.href = "/site/"+user._id} className="ContextMenuItem">
                                        Open
                                    </ContextMenu.Item>
                                    <ContextMenu.Item onClick={() => window.open("/site/" + user._id, "_blank")} className="ContextMenuItem">
                                        Open in tab
                                    </ContextMenu.Item>
                                    <ContextMenu.Separator className="ContextMenuSeparator" />

                                    <ContextMenu.Item onClick={() => duplicateSite(user._id)} className="ContextMenuItem">
                                        Duplicate
                                    </ContextMenu.Item>

                                    <ContextMenu.Separator className="ContextMenuSeparator" />



                                        <ContextMenu.Item className="ContextMenuItem">
                                        <Dialog.Trigger asChild>
                                       <div>Rename</div>
                                       </Dialog.Trigger>
                                    </ContextMenu.Item>
                                    <ContextMenu.Item onClick={() => deleteSite(user._id)} className="ContextMenuItem">
                                        Delete
                                    </ContextMenu.Item>
                                </ContextMenu.Content>
                            </ContextMenu.Portal>
                        </ContextMenu.Root>
                        <Dialog.Portal>
                                            <Dialog.Overlay className="DialogOverlay" />
                                            <Dialog.Content className="DialogContent">
                                                <Dialog.Title className="DialogTitle">Create New Site</Dialog.Title>
                                                <Dialog.Description className="DialogDescription">
                                                    Enter your Site name here and started building.
                                                </Dialog.Description>
                                                <fieldset className="Fieldset">
                                                    <input ref={renameRef} className="Input" id="name" placeholder='Site name' defaultValue={user.name} />
                                                </fieldset>
                                                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                                    <Dialog.Close asChild>
                                                        <button onClick={()=>{renameSite(user._id)}} className="Button green">Save changes</button>
                                                    </Dialog.Close>
                                                </div>
                                                <Dialog.Close asChild>
                                                    <button className="IconButton" aria-label="Close">
                                                        <Cross2Icon />
                                                    </button>
                                                </Dialog.Close>
                                            </Dialog.Content>
                                        </Dialog.Portal>
                        </Dialog.Root>

                    ))}




                </div>
            </div>





        </div>
    );
}

export default Sites;
