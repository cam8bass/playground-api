<script setup lang="ts">
import UsersFieldsFilter from './UsersFieldsFilter.vue'
import UsersSearchFilter from './UsersSearchFilter.vue'
import UsersSortFilter from './UsersSortFilter.vue'
import UsersParametersFilter from './UsersParametersFilter.vue'
import UsersLimitFilter from './UsersLimitFilter.vue'
import BtnFilterFields from '@/components/shared-components/BtnFilterFields.vue'
import BtnFilterSort from '@/components/shared-components/BtnFilterSort.vue'
import BtnFilterParameters from '@/components/shared-components/BtnFilterParameters.vue'
import BtnFilterLimit from '@/components/shared-components/BtnFilterLimit.vue'

import type { ShowInterface } from '@/shared/interfaces'
import type { sortFilterType } from '@/shared/types/types'
import { ref } from 'vue'

const btnDisable = ref<boolean>(true)
const props = defineProps<{
  show: ShowInterface
  results: number
  limitPerPage: number
}>()

function updateBtnDisable(value: boolean): void {
  if (btnDisable.value === value) return
  btnDisable.value = value

  console.log(value)
}

const emits = defineEmits<{
  (e: 'updateSearch', value: string): void
  (e: 'fetchAllUsersWithQuery'): void
  (e: 'updateFields', value: string[] | null): void
  (e: 'updateSort', value: sortFilterType | null): void
  (e: 'updateParameters', value: {} | null): void
  (e: 'updateLimit', limit: number): void
  (e: 'updateShowFilterFields'): void
  (e: 'updateShowFilterSort'): void
  (e: 'updateShowFilterParameters'): void
  (e: 'updateShowFilterLimit'): void
}>()
</script>
<template>
  <div class="filter">
    <div class="filter__content">
      <!-- Search Filter -->
      <UsersSearchFilter
        @update-search="emits('updateSearch', $event)"
        @fetch-all-users-with-query-search="emits('fetchAllUsersWithQuery')"
        @update-btn-disable="updateBtnDisable($event)"
      />

      <!-- Fields Filter -->
      <BtnFilterFields
        :showFilterFields="props.show.fields"
        @updateShowFilterFields="emits('updateShowFilterFields')"
      />

      <Transition name="translateDown" mode="out-in">
        <UsersFieldsFilter
          v-show="props.show.fields"
          :class="!props.show.fields ? 'hide' : ''"
          @updateFields="emits('updateFields', $event)"
          @update-btn-disable="updateBtnDisable($event)"
        />
      </Transition>

      <!-- Sort Filter -->
      <BtnFilterSort
        :showFilterSort="props.show.sort"
        @update-show-filter-sort="emits('updateShowFilterSort')"
      />
      <Transition name="translateDown" mode="out-in">
        <UsersSortFilter
          v-show="props.show.sort"
          :showFilterSort="props.show.sort"
          @update-sort="emits('updateSort', $event)"
          @update-btn-disable="updateBtnDisable($event)"
        />
      </Transition>

      <!-- Parameters filter -->
      <BtnFilterParameters
        :showFilterParameters="props.show.parameters"
        @update-show-filter-parameters="emits('updateShowFilterParameters')"
      />
      <Transition name="translateDown" mode="out-in">
        <UsersParametersFilter
          v-show="props.show.parameters"
          :showFilterParameters="props.show.parameters"
          @update-parameters="emits('updateParameters', $event)"
          @update-btn-disable="updateBtnDisable($event)"
        />
      </Transition>
      <!-- Limit Filter -->
      <BtnFilterLimit
        :showFilterLimit="props.show.limit"
        @update-show-filter-limit="emits('updateShowFilterLimit')"
      />
      <Transition name="translateDown" mode="out-in">
        <UsersLimitFilter
          v-show="props.show.limit"
          :results="props.results"
          :limitPerPage="props.limitPerPage"
          :showFilterLimit="props.show.limit"
          @updateLimit="emits('updateLimit', $event)"
          @update-btn-disable="updateBtnDisable($event)"
        />
      </Transition>
    </div>

    <button
      :disabled="btnDisable"
      aria-label="Appliquer les filtres"
      title="Appliquer les filtres"
      @click="emits('fetchAllUsersWithQuery'), updateBtnDisable(true)"
      class="btn filter__btn"
    >
      Rechercher
    </button>
  </div>
</template>
<style lang="scss" scoped>
.filter {
  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  &__btn {
    align-self: center;
  }
}
</style>
