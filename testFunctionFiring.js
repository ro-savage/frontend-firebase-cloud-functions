const fetch = require('node-fetch');
const sleep = require('system-sleep');

const reserveTicket = (eventId, ticketId) => {
  fetch(`https://us-central1-functions-56eb1.cloudfunctions.net/reserveTicket?ticketid=${ticketId}&eventid=${eventId}`)
    .then((res) => {
    if (res.status != 201) {
      return res.text()
    }
     return res.json()
    })
    .then((json) => {
      if(!json || json.error) {
        console.log('json error', ticketId, json)
      } else {
        console.log('Saved', json)
      }
    }).catch(err => {
    console.log('catch err', ticketId, err)
  })
}

const purchaseTicket = (eventId, ticketId) => {
  fetch(`https://us-central1-functions-56eb1.cloudfunctions.net/purchaseTicket?ticketid=${ticketId}&eventid=${eventId}`)
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

const resetTicket = (eventId, ticketId) => {
  fetch(`https://us-central1-functions-56eb1.cloudfunctions.net/resetTicket?ticketid=${ticketId}&eventid=${eventId}`)
    .then((res) => {
      if (res.status != 201) {
        return res.text()
      }
      return res.json()
    })
    .then((json) => {
      if(!json || json.error) {
        console.log('json error', ticketId, json)
      } else {
        console.log('Saved', json)
      }
    }).catch(err => {
    console.log('catch err', ticketId, err)
  })
}

const superFast = (eventId, ticketId) => {
  fetch(`https://us-central1-functions-56eb1.cloudfunctions.net/superFast?ticketid=${ticketId}&eventid=${eventId}`)
    .then((res) => {
      if (res.status != 200) {
        return res.text()
      }
      return res.json()
    })
    .then((json) => {
      if(!json || json.error) {
        console.log('json error', ticketId, json)
      } else {
        console.log('Saved', json)
      }
    }).catch(err => {
    console.log('catch err', ticketId, err)
  })
}

const reserveBulkTickets = (eventId, start, numberToReserve) => {
  for (let i = start; i <= start + numberToReserve; i++) {
    reserveTicket(eventId, i)
  }
}

const resetBulkTickets = (eventId, start, numberToReserve) => {
  for (let i = start; i <= start + numberToReserve; i++) {
    resetTicket(eventId, i)
  }
}

const superFastBulk = (eventId, start, numberToReserve) => {
  for (let i = start; i <= start + numberToReserve; i++) {
    superFast(eventId, i)
  }
}

// reserveBulkTickets('event2', 99)
console.log('Starting....')

// reserveBulkTickets('event2', 1, 649)
reserveBulkTickets('event2', 1, 100)
