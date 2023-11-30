const getValidTask = () => {
  return {
    taskName: 'abcdefg',
    myDate: '2023-09-20T10:40:38.928Z',
    myPriority: 10,
    taskSubject: ['other'],
    isCompleted: false,
    taskLocation: [0, 0],
  }
}

const getInvalidTask = () => {
  return {
    myDate: '2023-09-20T10:40:38.928Z',
    myPriority: 10,
    taskSubject: ['other'],
    isCompleted: false,
    taskLocation: [0, 0],
  }
}

module.exports = { getInvalidTask, getValidTask }
