firebase.initializeApp(CONFIG);

// Get a reference to the database service
const database = firebase.database();

const event1listener = firebase.database().ref('/tickets/event1').on('value', function(snapshot) {
  const val = snapshot.val()
  document.querySelector('#ticketCount').textContent = getTicketCount(val.tickets)
  updateTickets(val.tickets)
  createSeats(val.tickets)
});

const getTicketCount = (tickets) => {
  let ticketCount = 0
  tickets.forEach(ticket => {
    ticket.available && ticketCount++
  })
  return ticketCount
}

const updateTickets = (tickets) => {
  const elTickets = document.querySelector('#tickets')
  elTickets.innerHTML = ''
  tickets.forEach(ticket => {
    const li = document.createElement("li")

    const btnReserve = document.createElement("button")
    btnReserve.textContent = 'Reserve'
    btnReserve.addEventListener('click', () => reserveTicket(ticket.id))

    const btnPurchase = document.createElement("button")
    btnPurchase.textContent = 'Purchase'
    btnPurchase.addEventListener('click', () => purchaseTicket(ticket.id))

    const btnReset = document.createElement("button")
    btnReset.textContent = 'Reset'
    btnReset.addEventListener('click', () => resetTicket(ticket.id))

    const ticketUl = updateTicket(ticket)
    li.textContent = `Ticket id: ${ticket.id}`
    li.appendChild(btnReserve)
    li.appendChild(btnPurchase)
    li.appendChild(btnReset)
    li.appendChild(ticketUl)
    elTickets.appendChild(li)
  })
}

const updateTicket = (ticket) => {
  const ul = document.createElement("ul")
  ul.id = ticket.id
  Object.keys(ticket).forEach(key => {
    const li = document.createElement("li")
    li.textContent = `${key}: ${ticket[key]}`
    if (ticket[key] ===  false) { li.className = 'false' }
    if (ticket[key] ===  true) { li.className = 'true' }
    ul.appendChild(li)
  })

  return ul
}

const reserveTicket = (ticketId) => {
  fetch(`https://us-central1-functions-56eb1.cloudfunctions.net/reserveTicket?ticketid=${ticketId}`)
    .then((res) => res.json())
    .then((json) => {
    if(!json || json.error) {
      console.log('json error', json)
    } else {
      console.log('Saved', json)
    }
  }).catch(err => {
    console.log('catch err', err)
  })
}

const purchaseTicket = (ticketId) => {
  fetch(`https://us-central1-functions-56eb1.cloudfunctions.net/purchaseTicket?ticketid=${ticketId}`)
    .then((res) => res.json())
    .then((json) => {
      if(!json || json.error) {
        console.log('json error', json)
      } else {
        console.log('Saved', json)
      }
    }).catch(err => {
    console.log('catch err', err)
  })
}

const resetTicket = (ticketId) => {
  fetch(`https://us-central1-functions-56eb1.cloudfunctions.net/resetTicket?ticketid=${ticketId}`)
    .then((res) => res.json())
    .then((json) => {
      if(!json || json.error) {
        console.log('json error', json)
      } else {
        console.log('Saved', json)
      }
    }).catch(err => {
    console.log('catch err', err)
  })
}

const createSeats = (tickets) => {
  tickets.forEach(ticket => {
    console.log('looking for: ', document.querySelector(`#seatId${ticket.id}`))
    if (document.querySelector(`#seatId${ticket.id}`)) {
      console.log('found', ticket.id)
      updateSeat(ticket)
    } else {
      console.log('not found', ticket.id)
      createSeat(ticket)
    }
  })
}

const createSeat = (ticket) => {
  console.log('createSeat' , ticket)

  const elSeatPlan = document.querySelector('#seatplan')

  const divSeat = document.createElement("div")
  divSeat.classList.add('seat')
  divSeat.id = `seatId${ticket.id}`
  divSeat.dataset.id = ticket.id
  if (!ticket.available) { divSeat.classList.add('seat-unavailable') }
  divSeat.addEventListener('click', () => {
    console.log('clicked - ', ticket.id)
    if (ticket.available) {
      reserveTicket(ticket.id)
      removeSelectedSeats()
      divSeat.classList.add('seat-selected')
    }
  })
  elSeatPlan.appendChild(divSeat)
}

const updateSeat = (ticket) => {
 const divSeat = document.querySelector(`#seatId${ticket.id}`)
  if (!divSeat.classList.contains('seat-selected')) {
    if (!ticket.available) { divSeat.classList.add('seat-unavailable') }
    if (ticket.available) { divSeat.classList.remove('seat-unavailable') }
  }
}

const removeSelectedSeats = () => {
  console.log('removing')
  document.querySelectorAll('.seat').forEach(div => {
    if (div.classList.contains('seat-selected') ) {
      console.log(div.dataset.id)
      div.classList.remove('seat-selected')
      resetTicket(div.dataset.id)
    }
  })
}
