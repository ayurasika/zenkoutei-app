<template>
  <div class="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-2xl bg-white rounded-3xl shadow-lg flex flex-col h-[80vh]">
      <!-- ヘッダー -->
      <div class="bg-pink-200 rounded-t-3xl p-6 text-center">
        <h1 class="text-3xl font-bold text-gray-800">全肯定さん</h1>
        <p class="text-sm text-gray-600 mt-1">あなたのすべてを肯定します</p>
      </div>

      <!-- チャットエリア -->
      <div 
        ref="chatContainer"
        class="flex-1 overflow-y-auto p-6 space-y-4"
      >
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="flex"
          :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div 
            :class="[
              'max-w-[80%] p-4 rounded-2xl',
              message.role === 'user' ? 'bg-pink-100 ml-auto' : 'bg-gray-100'
            ]"
          >
            <p class="text-gray-800 whitespace-pre-wrap">{{ message.content }}</p>
          </div>
        </div>
        
        <!-- ローディングアニメーション -->
        <div v-if="isLoading" class="flex justify-start">
          <div class="max-w-[80%] p-4 rounded-2xl bg-gray-100">
            <div class="flex gap-1">
              <div class="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 入力エリア -->
      <div class="p-6 bg-white rounded-b-3xl border-t border-pink-200">
        <div class="flex gap-3">
          <input
            v-model="inputMessage"
            @keypress.enter="sendMessage"
            type="text"
            placeholder="メッセージを入力..."
            class="flex-1 px-4 py-3 rounded-full border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            :disabled="isLoading"
          />
          <button
            @click="sendMessage"
            :disabled="!inputMessage.trim() || isLoading"
            class="px-6 py-3 bg-pink-200 hover:bg-pink-300 rounded-full font-medium text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const messages = ref([
  {
    role: 'assistant',
    content: 'こんにちは！全肯定さんだよ。今日もお疲れさま！何でも話してね〜'
  }
])
const inputMessage = ref('')
const isLoading = ref(false)
const chatContainer = ref(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

const sendMessage = async () => {
  const userMessage = inputMessage.value.trim()
  if (!userMessage || isLoading.value) return

  // ユーザーメッセージを追加
  messages.value.push({
    role: 'user',
    content: userMessage
  })
  
  inputMessage.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    console.log('📤 送信するメッセージ:', messages.value)
    
    // APIにリクエストを送信
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages.value
      })
    })

    console.log('📥 レスポンスステータス:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ エラーレスポンス:', errorData)
      throw new Error(errorData.error || 'API呼び出しに失敗しました')
    }

    const data = await response.json()
    console.log('✅ 受信データ:', data)
    
    const aiResponse = data.text

    // AIのレスポンスを追加
    messages.value.push({
      role: 'assistant',
      content: aiResponse
    })
    
    console.log('[送信成功] メッセージの送信が完了しました')
  } catch (error) {
    console.error('[送信エラー]:', error)
    
    messages.value.push({
      role: 'assistant',
      content: 'ごめんね、ちょっとうまく応答できなかったよ。もう一度話してくれる？'
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>