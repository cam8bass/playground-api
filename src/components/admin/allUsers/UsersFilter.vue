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

import type { ShowType, queryType } from '@/shared/types/types'
import { ref } from 'vue'
import type { ShowInterface } from '@/shared/interfaces'

const btnDisable = ref<boolean>(true)
const props = defineProps<{
  show: ShowInterface
  results: number
  limitPerPage: number
}>()

function updateBtnDisable(value: boolean): void {
  if (btnDisable.value === value) return
  btnDisable.value = value
}

const emits = defineEmits<{
  (
    e: 'updateQuery',
    query: { input: queryType; value: string[] | string | {} | number | null }
  ): void
  (e: 'fetchAllUsersWithQuery'): void

  (e: 'updateShow', show: ShowType): void
}>()
</script>
<template>
  <div class="filter">
    <div class="filter__content">
      <!-- Search Filter -->
      <UsersSearchFilter
        @update-query="emits('updateQuery', $event)"
        @fetch-all-users-with-query-search="emits('fetchAllUsersWithQuery')"
        @update-btn-disable="updateBtnDisable($event)"
      />

      <!-- Fields Filter -->
      <BtnFilterFields
        :showFilterFields="props.show.fields"
        @updateShow="emits('updateShow', $event)"
      />

      <Transition name="translateDown" mode="out-in">
        <UsersFieldsFilter
          v-show="props.show.fields"
          :class="!props.show.fields ? 'hide' : ''"
          @updateQuery="emits('updateQuery', $event)"
          @update-btn-disable="updateBtnDisable($event)"
        />
      </Transition>

      <!-- Sort Filter -->
      <BtnFilterSort
        :showFilterSort="props.show.sort"
        @updateShow="emits('updateShow', $event)"
      />
      <Transition name="translateDown" mode="out-in">
        <UsersSortFilter
          v-show="props.show.sort"
          :showFilterSort="props.show.sort"
          @updateQuery="emits('updateQuery', $event)"
          @update-btn-disable="updateBtnDisable($event)"
        />
      </Transition>

      <!-- Parameters filter -->
      <BtnFilterParameters
        :showFilterParameters="props.show.parameters"
        @updateShow="emits('updateShow', $event)"
      />
      <Transition name="translateDown" mode="out-in">
        <UsersParametersFilter
          v-show="props.show.parameters"
          :showFilterParameters="props.show.parameters"
          @updateQuery="emits('updateQuery', $event)"
          @update-btn-disable="updateBtnDisable($event)"
        />
      </Transition>
      <!-- Limit Filter -->
      <BtnFilterLimit
        :showFilterLimit="props.show.limit"
        @updateShow="emits('updateShow', $event)"
      />
      <Transition name="translateDown" mode="out-in">
        <UsersLimitFilter
          v-show="props.show.limit"
          :results="props.results"
          :limitPerPage="props.limitPerPage"
          :showFilterLimit="props.show.limit"
          @updateQuery="emits('updateQuery', $event)"
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
