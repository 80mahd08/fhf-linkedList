#include <emscripten.h>
#include <stdlib.h>

void print_int(int value);

typedef struct Node {
    int data;
    struct Node *next;
} Node;

EMSCRIPTEN_KEEPALIVE
void display(Node **head) {
    Node *temp = *head;
    while (temp != NULL) {
        print_int(temp->data);
        temp = temp->next;
    }
}

EMSCRIPTEN_KEEPALIVE
void append(Node **head, int data) {
    Node *new_node = (Node *)malloc(sizeof(Node));
    new_node->data = data;
    new_node->next = NULL;

    if (*head == NULL) {
        *head = new_node;
    } else {
        Node *temp = *head;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = new_node;
    }
}

EMSCRIPTEN_KEEPALIVE
void push(Node **head, int data) {
    Node *new_node = (Node *)malloc(sizeof(Node));
    new_node->data = data;
    new_node->next = *head;
    *head = new_node;
}

EMSCRIPTEN_KEEPALIVE
Node* LinkedList() {
    return NULL;
}

EMSCRIPTEN_KEEPALIVE
void freeList(Node **head) {
    Node *temp;
    while (*head != NULL) {
        temp = *head;
        *head = (*head)->next;
        free(temp);
    }
}

EMSCRIPTEN_KEEPALIVE
int get(Node **head, int index) {
    Node *temp = *head;
    int count = 0;
    while (temp != NULL) {
        if (count == index) {
            return temp->data;
        }
        count++;
        temp = temp->next;
    }
    return -1; // or some error value
}

EMSCRIPTEN_KEEPALIVE
void deleteNode(Node **head, int index) {
    if (*head == NULL) {
        return;
    }

    Node *temp = *head;

    if (index == 0) {
        *head = temp->next;
        free(temp);
        return;
    }

    for (int i = 0; temp != NULL && i < index - 1; i++) {
        temp = temp->next;
    }

    if (temp == NULL || temp->next == NULL) {
        return;
    }

    Node *next = temp->next->next;
    free(temp->next);
    temp->next = next;
}

EMSCRIPTEN_KEEPALIVE
void insert(Node **head, int index, int data) {
    if (index == 0) {
        push(head, data);
        return;
    }

    Node *new_node = (Node *)malloc(sizeof(Node));
    new_node->data = data;

    Node *temp = *head;
    for (int i = 0; temp != NULL && i < index - 1; i++) {
        temp = temp->next;
    }

    if (temp == NULL) {
        free(new_node);
        return;
    }

    new_node->next = temp->next;
    temp->next = new_node;
}

EMSCRIPTEN_KEEPALIVE
int length(Node **head) {
    int count = 0;
    Node *temp = *head;
    while (temp != NULL) {
        count++;
        temp = temp->next;
    }
    return count;
}

EMSCRIPTEN_KEEPALIVE
void reverse(Node **head) {
    Node *prev = NULL;
    Node *current = *head;
    Node *next = NULL;

    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }

    *head = prev;
}

int main() {
    return 0;
}
