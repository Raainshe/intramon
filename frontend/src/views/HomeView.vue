<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Monster {
  id: string
  name: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  element: string
  image?: string
  hp: number
  attack: number
  defense: number
}

const monsters = ref<Monster[]>([])
const leaderboard = ref<Array<{ name: string; monsterCount: number }>>([])
const isLoading = ref(false)
const showMonsterModal = ref(false)
const showInboxModal = ref(false)
const selectedMonster = ref<Monster | null>(null)
const currentSort = ref({ key: 'name', ascending: true })
const claimCode = ref('')
const crystals = ref(0)
const username = ref('')
const coalitionName = ref('Unknown')
const coalitionColor = ref('#8b5cf6')

// Placeholder monsters for demo
const placeholderMonsters: Monster[] = [
  { id: '1', name: 'Flameon', rarity: 'common', element: 'Fire', hp: 100, attack: 50, defense: 30 },
  { id: '2', name: 'Aquarius', rarity: 'rare', element: 'Water', hp: 120, attack: 60, defense: 40 },
  { id: '3', name: 'Thunderbolt', rarity: 'epic', element: 'Electro', hp: 150, attack: 80, defense: 50 },
  { id: '4', name: 'Frostbite', rarity: 'legendary', element: 'Ice', hp: 200, attack: 100, defense: 70 },
  { id: '5', name: 'Leafwing', rarity: 'common', element: 'Plant', hp: 90, attack: 45, defense: 35 },
  { id: '6', name: 'Rockguard', rarity: 'rare', element: 'Ground', hp: 130, attack: 55, defense: 60 },
]

const elementColors: Record<string, string> = {
  Electro: '#FFD700',
  Water: '#00BFFF',
  Fire: '#FF4500',
  Ice: '#00FFFF',
  Plant: '#32CD32',
  Ground: '#8B4513'
}

const getRarityColor = (rarity: string) => {
  switch (rarity?.toLowerCase()) {
    case 'common': return '#4CAF50'
    case 'rare': return '#2196F3'
    case 'epic': return '#9C27B0'
    case 'legendary': return '#FF9800'
    default: return '#555'
  }
}

const sortedMonsters = computed(() => {
  const sorted = [...monsters.value]
  const dir = currentSort.value.ascending ? 1 : -1

  if (currentSort.value.key === 'rarity') {
    const order = ['common', 'rare', 'epic', 'legendary']
    return sorted.sort((a, b) => 
      (order.indexOf(a.rarity.toLowerCase()) - order.indexOf(b.rarity.toLowerCase())) * dir
    )
  }

  if (currentSort.value.key === 'element') {
    return sorted.sort((a, b) => {
      if (a.element === b.element) return a.name.localeCompare(b.name) * dir
      return a.element.localeCompare(b.element) * dir
    })
  }

  return sorted.sort((a, b) => a.name.localeCompare(b.name) * dir)
})

const getPlaceholderImage = (name: string) => {
  return `https://via.placeholder.com/96x96/8b5cf6/ffffff?text=${encodeURIComponent(name.charAt(0))}`
}

const openMonsterModal = (monster: Monster) => {
  selectedMonster.value = monster
  showMonsterModal.value = true
}

const closeMonsterModal = () => {
  showMonsterModal.value = false
  selectedMonster.value = null
}

const toggleSortOrder = () => {
  currentSort.value.ascending = !currentSort.value.ascending
}

const handleLogin = () => {
  // Placeholder for login functionality
  alert('Login functionality will be implemented')
}

const handleClaimCode = () => {
  if (!claimCode.value.trim()) {
    alert('Enter a code!')
    return
  }
  alert(`Code "${claimCode.value}" would be redeemed`)
  claimCode.value = ''
}

const handleCheckInbox = () => {
  alert('Inbox functionality will be implemented')
}

const handleRefreshLeaderboard = async () => {
  isLoading.value = true
  // Simulate API call
  setTimeout(() => {
    leaderboard.value = [
      { name: 'Player1', monsterCount: 25 },
      { name: 'Player2', monsterCount: 20 },
      { name: 'Player3', monsterCount: 18 },
    ]
    isLoading.value = false
  }, 500)
}

onMounted(() => {
  // Load placeholder monsters
  monsters.value = placeholderMonsters
  handleRefreshLeaderboard()
})
</script>

<template>
  <div class="intramon-page">
    <div class="page-aura" aria-hidden="true"></div>

    <!-- Top Bar -->
    <header id="top-bar" class="top-bar">
      <div class="top-bar-left">
        <div class="title-section">
          <h1>Intramon</h1>
          <div v-if="username" id="username-display" class="username-display">
            Logged in as: {{ username }} ({{ coalitionName }})
          </div>
        </div>
      </div>

      <div class="top-bar-right">
        <button id="check-inbox-btn" class="btn-primary" @click="handleCheckInbox">
          Check Inbox
        </button>

        <div class="claim-code-section">
          <input 
            id="claim-code-input" 
            v-model="claimCode"
            placeholder="Enter claim code"
            class="claim-input"
          >
          <button id="claim-code-btn" class="btn-primary" @click="handleClaimCode">
            Redeem
          </button>
        </div>

        <div id="sort-controls" class="sort-controls">
          <label for="sort-select" class="sort-label">Sort</label>
          <select 
            id="sort-select" 
            v-model="currentSort.key"
            class="sort-select"
          >
            <option value="name">Name</option>
            <option value="rarity">Rarity</option>
            <option value="element">Element</option>
          </select>
          <button 
            id="sort-order-btn" 
            class="sort-order-btn"
            @click="toggleSortOrder"
            :title="currentSort.ascending ? 'Ascending' : 'Descending'"
          >
            {{ currentSort.ascending ? '⬆️' : '⬇️' }}
          </button>
        </div>

        <div id="crystal-counter" class="crystal-counter">
          💎 <span id="crystal-amount">{{ crystals }}</span>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main id="main-container" class="main-container">
      <!-- Leaderboard -->
      <aside id="leaderboard" class="leaderboard">
        <h3>Leaderboard</h3>
        <ol id="leaderboard-list" class="leaderboard-list">
          <li v-for="(player, index) in leaderboard" :key="index">
            {{ player.name }} ({{ player.monsterCount }} mons)
          </li>
          <li v-if="leaderboard.length === 0" class="empty">No players yet</li>
        </ol>
        <div class="leaderboard-actions">
          <button 
            id="leaderboard-refresh-btn" 
            class="btn-primary btn-small"
            @click="handleRefreshLeaderboard"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Loading...' : 'Refresh' }}
          </button>
        </div>
      </aside>

      <!-- Monster Grid -->
      <section class="monster-section">
        <div id="monster-grid" class="monster-grid">
          <div
            v-for="(monster, index) in sortedMonsters"
            :key="monster.id"
            class="monster-card shimmer pulse"
            :data-rarity="monster.rarity"
            :style="{
              borderImageSource: `linear-gradient(135deg, ${getRarityColor(monster.rarity)}, rgba(255,255,255,0.2))`,
              animationDelay: `${index * 45}ms`
            }"
            @click="openMonsterModal(monster)"
          >
            <img 
              :src="monster.image || getPlaceholderImage(monster.name)"
              :alt="monster.name"
              class="monster-image"
            >
            <h3 :style="{ color: elementColors[monster.element] || '#555' }">
              {{ monster.name }}
            </h3>
            <small>{{ monster.rarity.toUpperCase() }}</small>
          </div>
        </div>
        <div class="login-section">
          <button id="login-btn" class="btn-primary" @click="handleLogin">
            Login via 42
          </button>
        </div>
      </section>
    </main>

    <!-- Monster Modal -->
    <div 
      v-if="showMonsterModal && selectedMonster" 
      id="monster-modal" 
      class="modal show"
      @click.self="closeMonsterModal"
    >
      <div class="modal-content">
        <span class="close-btn" @click="closeMonsterModal">&times;</span>
        <img 
          :src="selectedMonster.image || getPlaceholderImage(selectedMonster.name)"
          :alt="selectedMonster.name"
          class="modal-image"
        >
        <h2>{{ selectedMonster.name }}</h2>
        <small :style="{ color: getRarityColor(selectedMonster.rarity) }">
          {{ selectedMonster.rarity.toUpperCase() }}
        </small>
        <div class="stats">
          <p><b>HP:</b> <span>{{ selectedMonster.hp }}</span></p>
          <p><b>Attack:</b> <span>{{ selectedMonster.attack }}</span></p>
          <p><b>Defense:</b> <span>{{ selectedMonster.defense }}</span></p>
        </div>
        <div class="modal-actions">
          <button class="btn-primary">Gift to Player</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intramon-page {
  min-height: 100vh;
  padding: 28px;
  position: relative;
  z-index: 1;
}

.page-aura {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  mix-blend-mode: screen;
  background:
    radial-gradient(circle at 10% 10%, rgba(139, 92, 246, 0.10), transparent 10%),
    radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.06), transparent 10%);
  filter: blur(24px) saturate(1.2);
}

/* Top Bar */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.18), inset 0 0 40px rgba(139, 92, 246, 0.035);
  max-width: 1100px;
  margin: 0 auto 22px;
  position: relative;
  z-index: 5;
  backdrop-filter: blur(8px) saturate(1.2);
  transform: translateZ(0);
  flex-wrap: wrap;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  font-weight: 700;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
  color: #efeaff;
  font-size: 20px;
}

.username-display {
  font-weight: 700;
  color: #f3ecff;
  font-size: 14px;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.claim-code-section {
  display: flex;
  gap: 8px;
  align-items: center;
}

.claim-input {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 8px 10px;
  border-radius: 10px;
  color: #efeaff;
  outline: none;
  width: 150px;
}

.claim-input::placeholder {
  color: #9b94a8;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-label {
  color: #b9b9c6;
  font-weight: 600;
  font-size: 14px;
}

.sort-select {
  background: transparent;
  color: #efeaff;
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 8px 10px;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
}

.sort-order-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
}

.crystal-counter {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  padding: 6px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 18px;
}

/* Buttons */
button {
  appearance: none;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.14s ease, opacity 0.12s ease;
  font-size: 14px;
}

button:active {
  transform: scale(0.98);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(180deg, #8b5cf6, #6d28d9);
  color: white;
  box-shadow: 0 6px 22px rgba(107, 33, 168, 0.18);
}

.btn-small {
  padding: 8px 10px;
  font-size: 13px;
}

/* Main Container */
.main-container {
  display: flex;
  gap: 22px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
  z-index: 4;
}

/* Leaderboard */
.leaderboard {
  width: 230px;
  padding: 16px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 8px 30px rgba(11, 2, 22, 0.7);
}

.leaderboard h3 {
  margin: 0 0 10px;
  color: #efeaff;
}

.leaderboard-list {
  color: #b9b9c6;
  padding-left: 18px;
  margin: 0;
  list-style: decimal;
}

.leaderboard-list li {
  margin: 8px 0;
  font-size: 14px;
}

.leaderboard-list .empty {
  list-style: none;
  padding-left: 0;
  font-style: italic;
}

.leaderboard-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

/* Monster Section */
.monster-section {
  flex: 1;
}

.monster-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 12px;
  align-self: stretch;
}

.monster-card {
  position: relative;
  overflow: visible;
  cursor: pointer;
  padding: 18px 14px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.018), rgba(255, 255, 255, 0.01));
  border: 2px solid;
  border-image-slice: 1;
  box-shadow: 0 6px 26px rgba(2, 2, 6, 0.8);
  transition: transform 0.28s cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 0.28s, filter 0.28s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  transform-origin: center;
  will-change: transform;
  animation: floatIn 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.monster-card:hover {
  transform: translateY(-8px) scale(1.04) perspective(600px) rotateX(2deg) translateZ(4px);
  filter: saturate(1.05) drop-shadow(0 8px 40px rgba(107, 33, 168, 0.08));
}

.monster-image {
  width: 96px;
  height: 96px;
  object-fit: contain;
  transition: transform 0.5s;
}

.monster-card:hover .monster-image {
  transform: translateY(-6px) rotate(-3deg) scale(1.02);
}

.monster-card[data-rarity="common"] .monster-image {
  filter: drop-shadow(0 0 6px #4CAF50);
}

.monster-card[data-rarity="rare"] .monster-image {
  filter: drop-shadow(0 0 6px #2196F3);
}

.monster-card[data-rarity="epic"] .monster-image {
  filter: drop-shadow(0 0 6px #9C27B0);
}

.monster-card[data-rarity="legendary"] .monster-image {
  filter: drop-shadow(0 0 6px #FF9800);
}

.monster-card h3 {
  margin: 0;
  font-size: 16px;
  letter-spacing: -0.02em;
}

.monster-card small {
  color: #b9b9c6;
  font-weight: 600;
}

.login-section {
  display: flex;
  justify-content: center;
  margin-top: 18px;
}

/* Shimmer & Pulse Effects */
.pulse {
  animation: pulseGlow 3.6s ease-in-out infinite;
}

@keyframes pulseGlow {
  0% { box-shadow: 0 6px 26px rgba(99, 66, 255, 0.08); }
  50% { box-shadow: 0 18px 60px rgba(99, 66, 255, 0.14); }
  100% { box-shadow: 0 6px 26px rgba(99, 66, 255, 0.08); }
}

.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(139, 92, 246, 0.08) 50%,
    transparent 100%
  );
  transform: skewX(-20deg);
  animation: shimmer 1.6s linear infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0% { left: -150%; }
  100% { left: 150%; }
}

/* Modals */
.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.6));
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 999;
}

.modal.show {
  display: flex;
}

.modal-content {
  width: min(420px, 95%);
  border-radius: 18px;
  padding: 22px;
  position: relative;
  background: linear-gradient(180deg, rgba(16, 7, 28, 0.9), rgba(18, 9, 34, 0.95));
  border: 1px solid rgba(139, 92, 246, 0.08);
  box-shadow: 0 40px 120px rgba(7, 3, 18, 0.9);
  text-align: center;
}

.modal-image {
  width: 160px;
  height: 160px;
  object-fit: contain;
  margin: 0 auto 12px;
  display: block;
}

.close-btn {
  position: absolute;
  right: 14px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #cfc9ff;
  background: none;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats {
  margin: 12px 0;
}

.stats p {
  margin: 6px 0;
  color: #e9e6ff;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 12px;
}

/* Mobile */
@media (max-width: 840px) {
  .main-container {
    flex-direction: column;
  }
  
  .leaderboard {
    width: 100%;
    order: 2;
  }
  
  .monster-grid {
    order: 1;
  }

  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .top-bar-right {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .claim-code-section {
    width: 100%;
  }

  .claim-input {
    flex: 1;
  }
}
</style>
