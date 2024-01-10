import type { Directive, DirectiveBinding, VNode } from 'vue'

/**
 * A directive that can be used to toggle the visibility of an element.
 *
 * @param element the element to be toggled
 * @param binding the binding object that contains the current value of the directive
 * @param node the VNode of the element
 */
export const appear: Directive = {
  beforeMount(element: HTMLElement) {
    /**
     * Sets the visibility of the element to hidden. This is done to prevent the element from
     * being visible before the transition starts.
     */
    element.style.visibility = 'hidden'
  },
  updated(element: HTMLElement, binding: DirectiveBinding<boolean>, node: VNode) {
    /**
     * Checks if the new value of the binding is different from the old value and if the node
     * has a transition. If any of these conditions are not met, the function returns without
     * doing anything.
     */
    if (!binding.value === !binding.oldValue || null === node.transition) {
      return
    }

    /**
     * If the new value of the binding is false, the element is hidden by first triggering the
     * leave transition and then setting its visibility to hidden.
     */
    if (!binding.value) {
      node.transition.leave(element, () => {
        element.style.visibility = 'hidden'
      })
      return
    }

    /**
     * If the new value of the binding is true, the element is shown by first triggering the
     * beforeEnter transition, setting its visibility to visible, and then triggering the enter
     * transition.
     */
    node.transition.beforeEnter(element)
    element.style.visibility = ''
    node.transition.enter(element)
  }
}

// export const appear: Directive = {
//   beforeMount(element: HTMLElement) {
//     element.style.visibility = 'hidden'
//   },
//   updated(element: HTMLElement, binding: DirectiveBinding<boolean>, node: VNode) {
//     if (!binding.value === !binding.oldValue || null === node.transition) {
//       return
//     }

//     if (!binding.value) {
//       node.transition.leave(element, () => {
//         element.style.visibility = 'hidden'
//       })
//       return
//     }

//     node.transition.beforeEnter(element)
//     element.style.visibility = ''
//     node.transition.enter(element)
//   }
// }
