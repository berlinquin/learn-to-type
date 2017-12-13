import WpmStore from './WpmStore.js'

class Node {
  constructor(value, next, prev) {
    this.value = value
    this.next = next
    this.prev = prev
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  enqueue(value) {
    if (head == null) {
      this.head = new Node(value, null, null)
      this.tail = this.head
    } else {
      node = new Node(value, tail, null)
      tail.prev = node
      this.tail = node
    }
  }

  dequeue() {
    var value = this.head.value
    this.head = this.head.prev
    return value
  }

  hasNext() {
    return head != null
  }
}

export class WpmLinkedList extends WpmStore {
  constructor() {
    super()
    this.linkedList = new LinkedList()
    this.charsInPastSecond = 0
    this.sum = 0

    function updateLinkedList() {
      this.sum += this.charsInPastSecond
      this.linkedList.enqueue(this.charsInPastSecond)
      if (this.linkedList.hasNext()) {
        this.sum -= this.linkedList.dequeue()
      }
      this.charsInPastSecond = 0
    }
    this.interval = setInterval(() => {
      updateLinkedList()
    }, 1000)
    this.subscription = new Disposable(() => {
      clearInterval(this.interval)
    })
  }

  getWpm() {
    // words per minute == (characters per minute / 5)
    return this.sum / 5
  }

  keyPressed() {
    this.charsInPastSecond++
  }

  getSubscription() {
    return this.subscription
  }

  /**
  * @return int between [0, 60) representing current second in minute
  */
  getSecond() {
    return Math.floor(Date.now() / 1000) % 60
  }

}
