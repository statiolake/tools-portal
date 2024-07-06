<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>開発チーム社内ツールポータル</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      h1 {
        color: #333;
        text-align: center;
      }
      #searchInput {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
      }
      .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .card {
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 20px;
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
        cursor: pointer;
      }
      .card:hover {
        transform: translateY(-5px);
      }
      .card h2 {
        color: #2c3e50;
        margin-top: 0;
        font-size: 1.2em;
      }
      .card-content {
        flex-grow: 1;
      }
      .card-links {
        display: flex;
        justify-content: flex-end;
        margin-top: 15px;
        gap: 10px;
      }
      .card-link {
        flex: 0 0 calc(50% - 5px);
        max-width: calc(50% - 5px);
      }
      .card-link a {
        display: block;
        text-decoration: none;
        padding: 8px 15px;
        border-radius: 5px;
        transition:
          background-color 0.3s ease,
          color 0.3s ease;
        font-weight: bold;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
      }
      .dev-link a {
        background-color: #3498db;
        color: white;
      }
      .dev-link a:hover {
        background-color: #2980b9;
      }
      .prod-link a {
        background-color: #e74c3c;
        color: white;
        position: relative;
      }
      .prod-link a:hover {
        background-color: #c0392b;
      }
      .prod-link a::before {
        content: '⚠️';
        margin-right: 5px;
      }
      .tag-container {
        margin-top: 10px;
      }
      .tag {
        background-color: #95a5a6;
        color: white;
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 0.8em;
        margin-right: 5px;
        display: inline-block;
        margin-bottom: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .tag:hover {
        background-color: #7f8c8d;
      }
      .tag.active {
        background-color: #2ecc71;
      }
      .hidden {
        display: none;
      }
      /* ハンバーガーメニュー用のスタイル */
      .menu-toggle {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1001;
        cursor: pointer;
        width: 30px;
        height: 25px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 0.3s ease;
      }

      .menu-toggle span {
        display: block;
        width: 100%;
        height: 3px;
        background-color: #333;
        border-radius: 3px;
        transition: all 0.3s ease;
      }

      .menu-toggle.active span {
        background-color: white;
      }

      .menu-toggle.active span:nth-child(1) {
        transform: translateY(11px) rotate(45deg);
      }

      .menu-toggle.active span:nth-child(2) {
        opacity: 0;
      }

      .menu-toggle.active span:nth-child(3) {
        transform: translateY(-11px) rotate(-45deg);
      }
      .sidebar {
        position: fixed;
        top: 0;
        left: -250px;
        width: 250px;
        height: 100%;
        background-color: #2c3e50;
        transition: 0.3s;
        padding-top: 60px;
        z-index: 1000;
      }
      .sidebar.active {
        left: 0;
      }
      .sidebar ul {
        list-style-type: none;
        padding: 0;
      }
      .sidebar ul li {
        padding: 10px 20px;
      }
      .sidebar ul li a {
        color: white;
        text-decoration: none;
      }
      .popup {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 1002;
        max-width: 80%;
        width: 500px;
        max-height: 80vh;
        overflow-y: auto;
      }

      .popup-close {
        position: absolute;
        top: 15px;
        right: 20px;
        cursor: pointer;
        font-size: 28px;
        color: #666;
        line-height: 1;
        transition: color 0.3s ease;
      }

      .popup-close:hover {
        color: #333;
      }

      #popupTitle {
        margin-top: 0;
        margin-bottom: 15px;
        padding-right: 30px;
      }

      #popupDescription {
        margin-bottom: 0;
        line-height: 1.6;
      }
      .overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1001;
      }
    </style>
  </head>
  <body>
    <div class="menu-toggle" id="menuToggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="sidebar" id="sidebar">
      <ul>
        <li><a href="#">ホーム</a></li>
        <li><a href="#">ツール一覧</a></li>
        <li><a href="#">設定</a></li>
        <li><a href="#">ヘルプ</a></li>
      </ul>
    </div>
    <div class="container">
      <h1>開発チーム社内ツールポータル</h1>

      <input type="text" id="searchInput" placeholder="検索... (例: tag:デプロイ Jenkins)" />

      <div class="card-container">
        <div class="card" data-tags="CI/CD デプロイ">
          <div class="card-content">
            <h2>Jenkins</h2>
            <p>継続的インテグレーション/デリバリーツール</p>
            <div class="tag-container">
              <span class="tag" data-tag="CI/CD">CI/CD</span>
              <span class="tag" data-tag="デプロイ">デプロイ</span>
            </div>
          </div>
          <div class="card-links">
            <div class="card-link dev-link">
              <a href="#dev-jenkins" target="_blank">開発環境</a>
            </div>
            <div class="card-link prod-link">
              <a href="#prod-jenkins" target="_blank">本番環境</a>
            </div>
          </div>
        </div>

        <div class="card" data-tags="モニタリング ログ">
          <div class="card-content">
            <h2>Grafana</h2>
            <p>メトリクス視覚化・監視ツール</p>
            <div class="tag-container">
              <span class="tag" data-tag="モニタリング">モニタリング</span>
              <span class="tag" data-tag="ログ">ログ</span>
            </div>
          </div>
          <div class="card-links">
            <div class="card-link dev-link">
              <a href="#dev-grafana" target="_blank">開発環境</a>
            </div>
            <div class="card-link prod-link">
              <a href="#prod-grafana" target="_blank">本番環境</a>
            </div>
          </div>
        </div>

        <div class="card" data-tags="コード管理 バージョン管理">
          <div class="card-content">
            <h2>GitLab</h2>
            <p>ソースコード管理・CI/CDプラットフォーム</p>
            <div class="tag-container">
              <span class="tag" data-tag="コード管理">コード管理</span>
              <span class="tag" data-tag="バージョン管理">バージョン管理</span>
            </div>
          </div>
          <div class="card-links">
            <div class="card-link dev-link">
              <a href="#dev-gitlab" target="_blank">開発環境</a>
            </div>
            <div class="card-link prod-link">
              <a href="#prod-gitlab" target="_blank">本番環境</a>
            </div>
          </div>
        </div>

        <div class="card" data-tags="ドキュメント 共有">
          <div class="card-content">
            <h2>Confluence</h2>
            <p>チーム協業・ドキュメント管理ツール</p>
            <div class="tag-container">
              <span class="tag" data-tag="ドキュメント">ドキュメント</span>
              <span class="tag" data-tag="共有">共有</span>
            </div>
          </div>
          <div class="card-links">
            <div class="card-link dev-link">
              <a href="#dev-confluence" target="_blank">開発環境</a>
            </div>
            <div class="card-link prod-link">
              <a href="#prod-confluence" target="_blank">本番環境</a>
            </div>
          </div>
        </div>

        <div class="card" data-tags="バグトラッキング タスク管理">
          <div class="card-content">
            <h2>Jira</h2>
            <p>プロジェクト・課題管理ツール</p>
            <div class="tag-container">
              <span class="tag" data-tag="バグトラッキング">バグトラッキング</span>
              <span class="tag" data-tag="タスク管理">タスク管理</span>
            </div>
          </div>
          <div class="card-links">
            <div class="card-link dev-link">
              <a href="#dev-jira" target="_blank">開発環境</a>
            </div>
            <div class="card-link prod-link">
              <a href="#prod-jira" target="_blank">本番環境</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="popup" id="popup">
      <span class="popup-close" id="popupClose">&times;</span>
      <h2 id="popupTitle"></h2>
      <p id="popupDescription"></p>
    </div>
    <div class="overlay" id="overlay"></div>

    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('searchInput');
        const cards = document.querySelectorAll('.card');
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const tags = document.querySelectorAll('.tag');
        const popup = document.getElementById('popup');
        const popupTitle = document.getElementById('popupTitle');
        const popupDescription = document.getElementById('popupDescription');
        const popupClose = document.getElementById('popupClose');
        const overlay = document.getElementById('overlay');

        function updateCards() {
          const searchTerms = searchInput.value
            .toLowerCase()
            .split(' ')
            .filter((term) => term.length > 0);
          const tagFilters = searchTerms
            .filter((term) => term.startsWith('tag:'))
            .map((term) => term.slice(4));
          const textFilters = searchTerms.filter((term) => !term.startsWith('tag:'));

          cards.forEach((card) => {
            const cardText = card.textContent.toLowerCase();
            const cardTags = card.dataset.tags.toLowerCase().split(' ');

            const matchesTagFilters =
              tagFilters.length === 0 ||
              tagFilters.every((tag) => cardTags.some((cardTag) => isMatch(tag, cardTag)));

            const matchesTextFilters =
              textFilters.length === 0 ||
              textFilters.some((term) => cardText.split(' ').some((word) => isMatch(term, word)));

            card.classList.toggle('hidden', !(matchesTagFilters && matchesTextFilters));
          });

          // タグのactive状態を更新
          tags.forEach((tag) => {
            const tagValue = tag.dataset.tag.toLowerCase();
            tag.classList.toggle(
              'active',
              tagFilters.some((filter) => isMatch(filter, tagValue))
            );
          });
        }

        function toggleTagInSearch(tag) {
          const tagTerm = `tag:${tag.toLowerCase()}`;
          const currentTerms = searchInput.value.toLowerCase().split(' ');

          if (currentTerms.includes(tagTerm)) {
            searchInput.value = currentTerms
              .filter((term) => term !== tagTerm)
              .join(' ')
              .trim();
          } else {
            currentTerms.push(tagTerm);
            searchInput.value = currentTerms.join(' ').trim();
          }

          updateCards();
        }

        function toggleSidebar() {
          sidebar.classList.toggle('active');
          menuToggle.classList.toggle('active');
        }

        function showPopup(title, description) {
          popupTitle.textContent = title;
          popupDescription.textContent = description;
          popup.style.display = 'block';
          overlay.style.display = 'block';
        }

        function closePopup() {
          popup.style.display = 'none';
          overlay.style.display = 'none';
        }

        searchInput.addEventListener('input', updateCards);

        menuToggle.addEventListener('click', toggleSidebar);

        tags.forEach((tag) => {
          tag.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation(); // イベントの伝播を停止
            toggleTagInSearch(this.dataset.tag);
          });
        });

        cards.forEach((card) => {
          card.addEventListener('click', function (event) {
            // タグまたはリンクがクリックされた場合、ポップアップを表示しない
            if (!event.target.closest('a') && !event.target.closest('.tag')) {
              const title = this.querySelector('h2').textContent;
              const description = this.querySelector('p').textContent;
              showPopup(title, description);
            }
          });
        });

        popupClose.addEventListener('click', closePopup);
        overlay.addEventListener('click', closePopup);

        // 初期表示時にカードを更新
        updateCards();
      });

      // レーベンシュタイン距離を計算する関数
      function levenshteinDistance(a, b) {
        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
          matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
          matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
          for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
              matrix[i][j] = matrix[i - 1][j - 1];
            } else {
              matrix[i][j] = Math.min(
                matrix[i - 1][j - 1] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j] + 1
              );
            }
          }
        }

        return matrix[b.length][a.length];
      }

      // 文字列の類似度をチェックする関数
      function isSimilar(str1, str2, threshold = 0.5) {
        const distance = levenshteinDistance(str1, str2);
        const maxLength = Math.max(str1.length, str2.length);
        const similarity = 1 - distance / maxLength;
        return similarity >= threshold;
      }

      // 部分列マッチングをチェックする関数
      function isSubsequence(str1, str2) {
        let i = 0,
          j = 0;
        while (i < str1.length && j < str2.length) {
          if (str1[i].toLowerCase() === str2[j].toLowerCase()) i++;
          j++;
        }
        return i === str1.length;
      }

      // 文字列マッチングをチェックする関数（編集距離と部分列を組み合わせる）
      function isMatch(searchTerm, targetString) {
        return isSubsequence(searchTerm, targetString) || isSimilar(searchTerm, targetString);
      }
    </script>
  </body>
</html>
