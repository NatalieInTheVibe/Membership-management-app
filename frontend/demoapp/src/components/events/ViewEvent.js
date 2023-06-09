import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ViewEvent() {
    const [event, setEvent] = useState({});
    const [enrolledMember, setEnrolledMember] = useState([]); 
    const {evtNo} = useParams();

    useEffect(() => {
        const loadEvent = async () => {
            const result = await axios.get(`http://localhost:8080/eventDetails/getEventById/${evtNo}`);
            setEvent(result.data);
        };
        loadEvent();
        const loadEnrolledMember = async () => {
            const result = await axios.get(`http://localhost:8080/eventDetails/eventList/${evtNo}/members`);
            setEnrolledMember(result.data);
        }
        loadEnrolledMember();
    }, [evtNo]);

    

  return (
    <div className='container'>
        <div className='row'>
        <div className='col-md-4 offset-md-1 border rounded p-4 mt-2 shadow'>
        <h2 className='text-center m-4'>View Event Details</h2>
        <div className='card'>
            <div className='card-header'>Details of Event Number: 
            </div>
            <div className='card-body'>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item' key={event.evtNo}>
                        <b>Event Number: </b>
                        {event.evtNo}
                    </li>
                    <li className='list-group-item' key={event.evtName}>
                        <b>Event Name: </b>
                        {event.evtName}
                    </li>
                </ul>
            </div>
        </div>
        <Link className='btn btn-outline-primary mt-2' to={`/eventList`} >Back</Link>
        </div>
        <div className='col-md-4 offset-md-1 border rounded p-4 mt-2 shadow'>
        <h2 className='text-center m-4'>View Enrollment Details</h2>
        <div className='card'>
            <div className='card-header'>Details of Member enrolled: </div>
            <div className='card-body'>
                
                    {enrolledMember && enrolledMember !== null && 
                    enrolledMember.map((member) => {
                        return (
                            <>
                            <ul className='list-group list-group-flush'>
                            <li className='list-group-item' key={member.mbrNo}>
                                <b>Member Number: </b>
                                {member.mbrNo}
                            </li>
                            <li className='list-group-item' key={member.mbrName}>
                                <b>Member Name: </b>
                                {member.mbrName}
                            </li>
                            </ul>
                            </>
                        )
                    })}                
            </div>
        </div>
        </div>
        </div>
    </div>

  )
}
