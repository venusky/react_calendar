import React, { useState } from 'react';
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    HostName?: string;
}

const MonCalendrier: React.FC<Omit<CalendarProps, 'localizer'>> = (props) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectStartDate, setSelectStartDate] = useState<Date | null>(null);
    const [selectEndDate, setSelectEndDate] = useState<Date | null>(null);
    const [eventTitle, setEventTitle] = useState('');

    const handleSelectSlot = (slotInfo: any) => {
        setShowModal(true);
        setSelectStartDate(slotInfo.start);
        setSelectEndDate(slotInfo.end);
    };

    const saveEvent = () => {
        if (eventTitle && selectStartDate && selectEndDate) {
            const newEvent = {
                title: eventTitle,
                start: selectStartDate,
                end: selectEndDate,
            };
            setEvents([...events, newEvent]);
            setShowModal(false);
            setEventTitle('');
        }
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable={true}
                onSelectSlot={handleSelectSlot}
                {...props}
            />

            {showModal && (
                <div className="modal" style={{
                    display: 'block',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Set Event</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label className="py-8">Event Title :</label>
                                <input
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="eventTitle"
                                />
                                <label className="py-8">Start date :</label>
                                <input
                                    value={selectStartDate ? moment(selectStartDate).format('YYYY-MM-DDTHH:mm') : ''}
                                    onChange={(e) => setSelectStartDate(e.target.value ? new Date(e.target.value) : null)}
                                    type="datetime-local"
                                    className="form-control"
                                    id="startDate"
                                />
                                <label className="py-8">End date :</label>
                                <input
                                    value={selectEndDate ? moment(selectEndDate).format('YYYY-MM-DDTHH:mm') : ''}
                                    onChange={(e) => setSelectEndDate(e.target.value ? new Date(e.target.value) : null)}
                                    type="datetime-local"
                                    className="form-control"
                                    id="endDate"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={saveEvent} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonCalendrier;
