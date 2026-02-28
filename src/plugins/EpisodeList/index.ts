import { Plugin } from 'xgplayer'
import './index.css'

const { POSITIONS } = Plugin

class EpisodeList extends Plugin {
  episodes: Array<{ name: string; url: string }>
  currentIndex: number
  private panel: HTMLElement | null = null

  static get pluginName() {
    return 'episodeList'
  }

  static get defaultConfig() {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
    }
  }

  constructor(args: any) {
    super(args)
    this.episodes = args.config.episodes || []
    this.currentIndex = args.config.currentIndex || 0
  }
  // 创建控制栏按钮
  render() {
    const btn = document.createElement('div')
    btn.className = 'xgplayer-episode-btn'
    btn.innerHTML = `
      <div class='xgplayer-icon-episode-list'>选集</div>
    `
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.togglePanel()
    })
    return btn
  }

  // 创建/切换面板
  togglePanel() {
    if (this.panel) {
      this.panel.remove()
      this.panel = null
      return
    }

    this.panel = document.createElement('div')
    this.panel.className = 'xgplayer-episode-panel'
    this.panel.innerHTML = `
      <div class="episode-list">
        ${this.episodes
          .map(
            (ep, idx) => `
          <div class="episode-item ${idx === this.currentIndex ? 'active' : ''}" data-index="${idx}">
            ${ep.name}
          </div>
        `,
          )
          .join('')}
      </div>
    `

    // 点击集数切换
    this.panel.querySelectorAll('.episode-item').forEach((item) => {
      item.addEventListener('click', () => {
        const index = parseInt((item as HTMLElement).dataset.index || '0')
        this.selectEpisode(index)
      })
    })

    // 点击其他区域关闭
    document.addEventListener('click', this.handleDocClick)

    this.root.appendChild(this.panel)
  }

  handleDocClick = (e: MouseEvent) => {
    if (this.panel && !this.panel.contains(e.target as Node)) {
      this.panel.remove()
      this.panel = null
      document.removeEventListener('click', this.handleDocClick)
    }
  }

  selectEpisode(index: number) {
    if (index === this.currentIndex) return

    this.currentIndex = index
    const episode = this.episodes[index]

    // 触发切换事件，外部可监听
    this.emit('episodeChange', { index, episode })
    this.player.playNext({
      url: episode!.url,
      autoplay: true,
    })

    // 关闭面板
    this.panel?.remove()
    this.panel = null
  }

  destroy() {
    this.panel?.remove()
    document.removeEventListener('click', this.handleDocClick)
    super.destroy()
  }
}

export default EpisodeList
