# Backlog.md クイックスタート（日本語）

[English README](README.md)

Backlog.md は、Git リポジトリ内の Markdown ファイルでタスクを管理する CLI ツールです。ターミナルのカンバンボードと
ブラウザの Web UI でタスクを確認・操作できます。

## インストール

```bash
npm i -g backlog.md
# または: bun add -g backlog.md
# または: brew install backlog-md
# または: nix run github:MrLesk/Backlog.md
```

インストールせずに試す場合は、パッケージ名をフルで指定します: `npx backlog.md init "My Project"`

## プロジェクトの初期化

```bash
# Git リポジトリ内で初期化
backlog init "My Awesome Project"

# Git を使わないローカルプロジェクトとして初期化
backlog init "Personal Planning" --no-git
```

初期化ウィザードでは AI ツールとの連携方法を選びます。

- **CLI instructions**（推奨）: エージェントに `backlog instructions overview` を実行させる短い指示ファイルを作成します
- **MCP connector**: Claude Code、Codex、Gemini CLI、Kiro、Cursor の MCP 設定を自動で追加します
- **Skip**: AI 連携を設定せず、タスク管理ツールとしてのみ使います

タスクは `backlog/` などのプロジェクト内フォルダに Markdown ファイルとして保存されます。

## タスクの作成と一覧表示

```bash
# タスクを作成
backlog task create "Render markdown as kanban"

# 説明と受け入れ基準を追加
backlog task edit TASK-1 -d "Detailed context" --ac "Clear acceptance criteria"

# タスクを一覧表示
backlog task list
backlog task list -s "To Do"

# タスクの詳細を表示
backlog task view TASK-1
```

タスク ID の接頭辞は `backlog init --task-prefix` で変更できます（既定は `TASK-1` 形式）。

## ボードと Web UI

```bash
# ターミナルでカンバンボードを表示
backlog board

# Web UI を起動（ブラウザが自動で開きます）
backlog browser

# ポートを指定
backlog browser --port 8080

# ブラウザを自動で開かない
backlog browser --no-open
```

Web UI は `127.0.0.1` でのみ待ち受けるため、同じマシンからのみアクセスできます。終了するには Ctrl+C を押します。

## 次に読むもの

- [README（英語）](README.md): AI エージェントとの使い方、MCP 連携、設定など
- [CLI リファレンス](CLI-INSTRUCTIONS.md)
- [高度な設定](ADVANCED-CONFIG.md)
