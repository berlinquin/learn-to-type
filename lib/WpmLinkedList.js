'use babel'

import WpmStore from './WpmStore.js'

console.log(WpmStore)

class Node {
  constructor(value, next, prev) {
    this.value = value
    this.next = next
    this.prev = prev
  }
  getNext() {
    return this.next
  }
  setNext(nextNode) {
    this.next = nextNode
  }
  getPrev() {
    return this.prev
  }
  setPrev(prevNode) {
    this.prev = prevNode
  }
  getValue() {
    return this.value
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  enqueue(value) {
    if (this.head == null) {
      this.head = new Node(value, null, null)
      this.tail = this.head
    } else {
      node = new Node(value, this.tail, null)
      this.tail.setPrev(node)
      this.tail = node
    }
    this.length++
  }

  dequeue() {
    var value = this.head.getValue()
    this.head = this.head.getPrev()
    this.length--
    return value
  }

  hasNext() {
    return this.head != null
  }

  getLength() {
    return this.length
  }
}

export default class WpmLinkedList extends WpmStore {
  constructor() {
    super();
    this.linkedList = new LinkedList()
    this.charsInPastSecond = 0
    this.sum = 0
  }

  getWpm() {
    // 1 word == 5 chars
    console.log('getWpm()')
    return this.sum / 5
  }

  updateStore() {
    console.log('updateStore() : '+this.charsInPastSecond)
    console.log('sum : '+this.sum)
    this.sum += this.charsInPastSecond
    console.log('sum : '+this.sum)
    this.linkedList.enqueue(this.charsInPastSecond)
    if (this.linkedList.getLength() > 60) {
      this.sum = this.sum - this.linkedList.dequeue()
    }
    this.charsInPastSecond = 0
  }

  keyPressed() {
    this.charsInPastSecond++
    console.log('keyPressed() : '+this.charsInPastSecond)
  }

  /**
  * @return int between [0, 60) representing current second in minute
  */
  getSecond() {
    return Math.floor(Date.now() / 1000) % 60
  }

}
