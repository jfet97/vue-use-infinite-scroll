# vue-use-infinite-scroll

## Installation

```sh
npm i -S vue-use-infinite-scroll
```

## Usage

### template

```html
<div>
    <span>{{ errorMessageRef }}</span>
    <ul>
        <li v-for="item in itemsRef" :key="item.id">{{ item }}</li>

        <!-- DOM element used as trigger -->
        <div ref="intersectionTrigger"></div>
    </ul>
</div>
```

### script

```js
import { ref, watch, watchEffect } from 'vue'
import { makeUseInfiniteScroll } from 'vue-use-infinite-scroll'

export default {
    setup() {
        // INTERSECTION OBSERVER

        // set the intersection options object
        // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        const useInfiniteScroll = makeUseInfiniteScroll({}) // the argument is optional

        // create the template ref for the element that
        // will trigger the intersection observer
        const intersectionTrigger = ref(null) // as Ref<HTMLElement>

        // useInfiniteScroll returns a pageRef, starting from page 1,
        // which changes we should listen to fetch more data
        const pageRef = useInfiniteScroll(intersectionTrigger)

        watch(
            pageRef,
            (page) => {
                fetchItems(page)
            },
            { immediate: true }
        )

        // DATA

        const itemsRef = ref([])
        const errorMessageRef = ref('')

        async function fetchItems(page) {
            fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`)
                .then((res) => res.json())
                .then((data) => itemsRef.value.push(...data))
                .catch((error) => (errorMessageRef.value = error.message))
        }

        return { intersectionTrigger, itemsRef, errorMessageRef }
    },
}
```

Try it [here](https://codesandbox.io/s/vue-use-infinite-scroll-vclfp?file=/src/App.vue) 🙂!
