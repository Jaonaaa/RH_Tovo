import React,{useState,useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin ,{Draggable} from "@fullcalendar/interaction"
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import './../../assets/css/calendrier.css'
import Nav_bar from './nav_bar'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export function EntretienAffichage() {
  const [open, setOpen] = useState(false);
  const [value,setValue] = useState({
    title:'',
    start:'',
    end:'',
  })
  const event = [
    {
      title:'Evenement 1',
      start:'2023-10-05',
      end:'2020-10-06'
    },
    {
      title:'Evenement 2',
      start:'2023-10-10',
      end:'2020-10-12'
    },
    {
      title:'Evenement 3',
      start:'2023-10-20',
      end:'2020-10-23',
      color:'red'
    }
  ]
  const handleSelect = (info)=>{
    console.log(info);
    
    
    const eventsOnClickedDate = event.map((ev,index)=>
      {if(ev.start===info.startStr){
        setValue({...value,
          start:info.startStr,
          end:info.endStr,
          title: ev.title
        })
        handleClickOpen()
      }}
    )
  }

  const handleValidate =()=>{
    console.log(value);
    setOpen(false);
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeValue =(e)=>{
    console.log(e.target.value);
    setValue({...value,[e.target.name]:e.target.value})
  }
  

  return <>
  <Nav_bar search_bar={true}/>
  <div className='box-entretient'>
    <div className='box-calendar-affichage'>
        <FullCalendar
          // height={'700'}
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={
            {
              start:'prev,next today',
              center:'title',
              end:'dayGridMonth,timeGridWeek,timeGridDay',
            }
        }
        selectable={true}
        events={event}
        select={handleSelect}
        />
    </div>
  </div>
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {value.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           
              <p>{value.start}</p>
              <p>{value.end}</p>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>Cancel</Button>
          <Button  onClick={handleValidate}>Ok</Button>
        </DialogActions>
      </Dialog>
  </>

}




export function Entretien() {
  const [open, setOpen] = useState(false);
  let po = null;
  const [value,setValue] = useState({
    title:'',
    start:'',
    end:'',
    color:''
  })
  // const event = [
  //   {
  //     title:'Evenement 1',
  //     start:'2023-10-05',
  //     end:'2020-10-06'
  //   },
  //   {
  //     title:'Evenement 2',
  //     start:'2023-10-10',
  //     end:'2020-10-12'
  //   },
  //   {
  //     title:'Evenement 3',
  //     start:'2023-10-20',
  //     end:'2020-10-23',
  //     color:'red'
  //   }
  // ]
  const departement = [
    {
      id:'1',
      name:'Sergio',
      poste:'Front-end',
      color:' rgb(127, 255, 204)',
      departement:'IT'
    },
    {
      id:'2',
      name:'Paul',
      poste:'Back-end',
      color:'rgb(53, 207, 48)',
      departement:'IT'
    },
    {
      id:'3',
      name:'Faniry',
      poste:'Conception affichage',
      color:'rgb(209, 39, 215)',
      departement:'IT'
    }
  ]
  const drag =()=>{
    let dragable = document.getElementById("external-event")
    if(po==null)
    {
    po = dragable ;
    new Draggable(dragable,{
      itemSelector:".event-element",
      eventData:function (eventElement){
        let id = eventElement.getAttribute('id') 
        let title = eventElement.getAttribute('title')
        let color = eventElement.getAttribute('color')
        return {
          id:id,
          title:title,
          color:color
        }
      }
    })
  }
  }
  
  useEffect(()=>{
    drag()
  },[])

  const handleSelect = (info)=>{
    console.log(info);
    handleClickOpen()
    setValue({...value,
      start:info.startStr,
      end:info.endStr
    })
  }

  const onChangeValue =(e)=>{
    console.log(e.target.value);
    setValue({...value,[e.target.name]:e.target.value})
  }
  
  const handleReceive =(eventInfo)=>{
    console.log(eventInfo.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    let value = {
      id : eventInfo.draggedEl.getAttribute('id'),
      title : eventInfo.draggedEl.getAttribute('title'),
      color : eventInfo.draggedEl.getAttribute('color')
    }
    // console.log(value);
  }


  const handleValidate =()=>{
    console.log(value);
    setOpen(false);
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  
  return <>
  <Nav_bar search_bar={true}/>
  <div className='box-entretient'>
  
    <div id='external-event' className='box-eventList'>
      <ul>
        {departement.map((dep,index)=>
          <li id={dep.poste} title={dep.name} color={dep.color} key={index} className='event-element'>
              <div className='name-event'>{dep.name}</div>
              <div style={{backgroundColor:dep.color}} className='color-event'>{dep.departement}</div>
          </li>
        )}
      </ul>

        
    </div>

    <div className='box-calendar'>
        <FullCalendar
          // height={'700'}
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={
            {
              start:'prev,next today',
              center:'title',
              end:'dayGridMonth,timeGridWeek,timeGridDay',
            }
        }
        selectable={true}
        select={handleSelect}
        drop={handleReceive}
        />
    </div>
  </div>

  
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Création d'évènement"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           
              <input type="text" name="title" id="" onChange={onChangeValue} />
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>Cancel</Button>
          <Button  onClick={handleValidate}>Ok</Button>
        </DialogActions>
      </Dialog>
  </>
}

