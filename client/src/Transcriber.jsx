import React from 'react'



export function Transcriber({ addUnopenedFood }) {

  // --- Speech recognition ---

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.lang = 'en-GB'
  recognition.interimResults = true
  recognition.continuous = true

  const delimiterWords = ["add", "open", "finish", "delete"]
  const delimiterPattern = "(?=" + delimiterWords.join("|") + ")"
  let finalTranscripts = ""


  // When speech recognition starts listening
  recognition.onstart = function() {
    console.log("Listening...")
  }

  // When speech stops
  recognition.onspeechend = function() {
    console.log("Stopped listening")
    // recognition.stop()
  }

  // Split transcript into a list of commands and execute each one
  recognition.onresult = function(event) {
    for (var i=event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        const transcript = event.results[i][0].transcript.toLowerCase()
        finalTranscripts += transcript
        console.log("transcript:", transcript)
        parseTranscript(transcript)
      }

    }
  }

  function parseTranscript(transcript) {
    const commands = transcript.split(new RegExp(delimiterPattern))
    commands.forEach(command => {
        parseCommand(command)
      });
      console.log("commands: ", commands)
    }

  function startSpeechRecognition() {
    recognition.start()
  }

  function stopSpeechRecognition() {
    console.log("stopping...")
    recognition.stop()
  }

  // Execute correct function depending on command content
  function parseCommand(command) {
    const words = command.trim().split(' ')
    if (words[0] == 'add') {
      parseAddCommand(words)
    }
  }

  // 
  function parseAddCommand(words) {
    const expiresIndex = words.indexOf('expires')
    if (expiresIndex !== -1) {
      const itemToAdd = words.slice(1, expiresIndex).join(' ')
      const dateWords = words.slice(expiresIndex + 1)
      const date = parseDate(dateWords)
      console.log(`Adding unopened ${itemToAdd} with expiry date of ${date}`)
      addUnopenedFood(itemToAdd, date)
    }
  }

  // test: I want to add something expires 26 slash 9 slash 23 delete
  // Parse date from format DD/MM/YY e.g. 26 slash 9 slash 23
  function parseDate(dateWords) {
    dateWords = dateWords.join('').split('/')
    if (dateWords.length !== 3) {
      console.log("date words:", dateWords)
      console.error("Can't understand date! I heard:", dateWords.join(' '))
      // ### ADD ERROR FUNCTION HERE ###
    }

    let yearString = dateWords[2]
    if (yearString.length < 3) {
      yearString = "20" + yearString
    }
    const year = parseInt(yearString)
    const month = parseInt(dateWords[1])
    const day = parseInt(dateWords[0])
    return new Date(year, month, day)
  }

  return (
    <>
      <button onClick={startSpeechRecognition} >Speak</button>
      <button onClick={stopSpeechRecognition} >Stop</button>
    </>
  )
}

  
// --- PLAN ---

// Function words: add...expires, open...use within, finish..., delete...
// loop through commands, call parsing function for each

// -- Extra --
// add flexibility for function words used
// add flexibility for dates
// remove repetitions of function words in a row
// remove words like "and" at the end of strings
// add backup if not chrome