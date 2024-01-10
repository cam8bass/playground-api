import { type Ref } from 'vue'

/**
 * This function initializes the intersection observer and sets the animate ref to true when the target element is intersecting with the viewport.
 * @param target the target element to observe
 * @param animate a ref to a boolean value that indicates whether the element should be animated
 */
export function initObserver(target: Ref<HTMLDivElement | null>, animate: Ref<boolean>) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animate.value = true
      }
    },
    {
      threshold: 0.2
    }
  )

  if (target.value) {
    observer.observe(target.value)
  }
}
