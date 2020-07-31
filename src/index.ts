import { ref, Ref, onMounted, onUnmounted } from 'vue-demi'

export type UseInfiniteScroll = (domElRef: Ref<HTMLElement>) => Ref<number>
export type MakeUseInfiniteScroll = (options?: IntersectionObserverInit) => UseInfiniteScroll

export const makeUseInfiniteScroll: MakeUseInfiniteScroll = (options) => (domElRef) => {
    const pageRef = ref(1)

    let observer: IntersectionObserver | undefined = void 0

    onMounted(() => {
        observer = new IntersectionObserver(([domEl]) => {
            if (domEl?.isIntersecting) {
                pageRef.value++
            }
        }, options ?? {})

        observer.observe(domElRef.value)
    })

    onUnmounted(() => {
        observer?.disconnect()
    })

    return pageRef
}
