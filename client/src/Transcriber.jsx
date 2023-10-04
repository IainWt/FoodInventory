import React, { useEffect, useRef, useState } from 'react'



export function Transcriber({ addUnopenedFood, removeUnopenedFood, addOpenedFood, calculateOpenExpiry, openFoodByName }) {

  const numbers = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
  }

  function stringToNum(word) {
    let num = parseInt(word)
    if (!isNaN(num)) {
      return num
    }
    num = numbers[word]
    if (num != null) return num
    console.error(`Could not parse ${word} as a number`)
  }

  // --- Speech recognition ---

  const [stopping, setStopping] = useState(false)
  const [resultsCount, setResultsCount] = useState(0)
  const previousValues = useRef({ stopping, resultsCount })

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.lang = 'en-GB'
  // recognition.interimResults = true
  recognition.continuous = true

  const delimiterWords = ["add", "open", "finish", "delete"]
  const delimiterPattern = "(?=" + delimiterWords.join("|") + ")"
  let finalTranscripts = ""


  // When speech recognition starts listening
  recognition.onstart = function() {
    console.log("Listening...")
  }

  recognition.onend = function() {
    console.log("Recognition ended")
  }

  // When speech stops
  recognition.onspeechend = function() {
    console.log("Stopped listening")
    // recognition.stop()
  }

  // Split transcript into a list of commands and execute each one
  recognition.onresult = function(event) {
    onResult(event)
  }

  function onResult(event) {

    setResultsCount((prevCount) => prevCount + 1)

    // if (stopping) {
    //   console.log("stopping in onresult:", stopping)
    //   console.log("Stopping is true, so aborting")
    //   recognition.abort()
    // } else {
    //   console.log("stopping in onresult:", stopping)
    // }

    for (var i=event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        const transcript = event.results[i][0].transcript.toLowerCase()
        finalTranscripts += transcript
        console.log("transcript:", transcript)
        parseTranscript(transcript)
      }
    }

  }

  function startSpeechRecognition() {
    recognition.start()
    setStopping(false)
  }

  function stopSpeechRecognition() {
    console.log("stopping...")
    // recognition.continuous = false
    // recognition.stop()
    setStopping(true)
  }

  // useEffect(() => {

  //   if (
  //     previousValues.current.stopping !== stopping &&
  //     previousValues.current.resultsCount !== resultsCount
  //   ) {
  //     console.log("value of stopping is now", stopping)
  //     console.log("value of resultsCount is now", resultsCount)
  //     console.log("Both changed so aborting")
  //     recognition.abort()
  //   }
  // })


  // ################## PARSING ################

  function parseTranscript(transcript) {
    const commands = transcript.split(new RegExp(delimiterPattern))
    commands.forEach(command => {
        parseCommand(command)
      });
      console.log("commands: ", commands)
    }

  // Execute correct function depending on command content
  function parseCommand(command) {
    const words = command.trim().split(' ')
    if (words[0] == 'add') {
      parseAddCommand(words)
    }
    else if (words[0] == 'open') {
      parseOpenCommand(words)
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

  // test: open tomato use within three days
  function parseOpenCommand(words) {
    const useRegex = /use|used/
    const useIndex = words.findIndex(element => useRegex.test(element))
    if (useIndex !== -1 && words[useIndex + 1] === 'within') {
      const itemToOpen = words.slice(1, useIndex).join(' ')
      const periodWords = words.slice(useIndex + 2)
      const openExpiry = parsePeriod(periodWords)
      console.log(`Opening ${itemToOpen} to be used before ${openExpiry}`)
      openFoodByName(itemToOpen, openExpiry)
    }
  }

  // test: I want to add something expires 26 slash 9 slash 23 delete
  // Parse date from format DD/MM/YY e.g. 26 slash 9 slash 23
  function parseDate(dateWords) {
    dateWords = dateWords.join('').split((new RegExp("/|slash")))
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
    const month = parseInt(dateWords[1]) - 1
    const day = parseInt(dateWords[0])
    console.log(year, month, day)
    console.log(new Date(year, month, day))
    return new Date(year, month, day)
  }

  function parsePeriod(periodWords) {
    const number = stringToNum(periodWords[0])
    let length = periodWords[1]
    if (length[length.length - 1] !== 's') length += 's'
    const lengthOptions = ['days', 'months']
    if (!lengthOptions.includes(length)) {
      console.error("You must give a number of days or months, not", length)
    }
    return calculateOpenExpiry(number, length)
  }

  return (
    <>
      <button onClick={startSpeechRecognition} >Speak</button>
      <button onClick={stopSpeechRecognition} >Stop</button>
    </>
  )
}

  
// --- PLAN ---

// fix problem where doesn't stop listening when press stop button after adding item

// Function words: add...expires, open...use within, finish..., delete...
// loop through commands, call parsing function for each

// -- Extra --
// add notifications for expiring food
// notify when opening something where one is already open
// when adding item without expiry date
// allow number words e.g. two not 2
// add flexibility for function words used
// add flexibility for dates
// remove repetitions of function words in a row
// remove words like "and" at the end of strings
// add backup if not chrome