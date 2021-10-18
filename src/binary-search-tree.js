const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js'); //структура узла

module.exports = class BinarySearchTree {

  constructor() {
    this.rootN = null; //корень дерева
  }

  root() {
    return this.rootN //возврат корневого значения
  }

  add(data) { //добавление узла
    let newNode = new Node(data);

    if (this.rootN === null) { //если нет корневого узла, то узел стоновится корневым
      this.rootN = newNode;
    } else { // если корневой узел есть, запускаем вспомогательную функцию для встраивания узла
      this.addN(this.rootN, newNode);
    }
    return this
  }

  
  addN(node, newNode) {
    if (newNode.data < node.data) { // если значние нового узла меньше корня и встраиваем в левое положение(если свободно), или повторяем функцию для левого значения(если занято)
        if (node.left === null) {
            node.left = newNode;
        } else {
            this.addN(node.left, newNode);
        }
    } else {
        if (node.right === null) { // по аналогии с левым положением.
            node.right = newNode;
        } else {
            this.addN(node.right, newNode);
        }
    }
  }

  search(node, data) { //поиск узла
    if (node === null) return null; 
    if (data < node.data) return this.search(node.left, data);
    if (data > node.data) return this.search(node.right, data);
    return node;
    }

  has(data) { //проверка есть ли узел
    if(this.search(this.rootN,data) === null) return false
    return true
  }

  find(data) { // поиск узла
    return this.search(this.rootN,data)
  }

  minNode(node) {
    // если слева от узла ноль тогда это должен быть минимальный узел
    if (node.left === null)
        return node;
    else
        return this.minNode(node.left);
  }

  maxNode(node) {
    // если справа от узла ноль тогда это должен быть максимальный узел
    if (node.right === null)
        return node;
    else
        return this.maxNode(node.right);
  }

  removeNode(node, data) {
    if (node === null) {
        return null;
    // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
    } else if (data < node.data) {
        node.left = this.removeNode(node.left, data);
        return node;
    // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
    } else if (data > node.data) {
        node.right = this.removeNode(node.right, data);
        return node;
    // если данные такие как данные корня, удаляем узел
    } else {
        // удаляем узел без потомков (листовой узел (leaf) или крайний)
        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }
        // удаляем узел с одним потомком
        if (node.left === null) {
            node = node.right;
            return node;
        } else if(node.right === null) {
            node = node.left;
            return node;
        }
        // удаляем узел с двумя потомками
        // minNode правого поддерева хранится в новом узле
        let newNode = this.minNode(node.right);
        node.data = newNode.data;
        node.right = this.removeNode(node.right, newNode.data);
        return node;
    }
}

  remove(data) {
    this.rootN = this.removeNode(this.rootN, data);
  }

  min() {
    return this.minNode(this.rootN).data
  }

  max() {
    return this.maxNode(this.rootN).data
  }

}