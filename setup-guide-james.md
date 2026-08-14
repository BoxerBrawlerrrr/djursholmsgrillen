# Claude Code Setup — Djursholmsgrillen

Follow this exactly. Takes ~10 minutes.

---

## Step 1 — Accept the GitHub invite

Check your email for an invite from BoxerBrawlerrrr to the `djursholmsgrillen` repo. Accept it.

---

## Step 2 — Install Git

Go to https://git-scm.com/download/win and download the installer. Run it, click Next through everything, defaults are fine.

---

## Step 3 — Install Node.js

1. Press **Win+R**, type `powershell`, hit Enter
2. Paste this and hit Enter:

```
winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
```

3. Wait for it to finish
4. **Restart your computer** — this is not optional. Node won't work until you restart.

After restart, open PowerShell again and run:

```
node --version
```

You should see something like `v24.x.x`. If you don't, the install failed — try running the winget command again.

---

## Step 4 — Fix PowerShell script permissions

This is required or npm commands will be blocked. Paste this and hit Enter:

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Type `Y` and hit Enter if it asks you to confirm.

---

## Step 5 — Install Claude Code

```
npm install -g @anthropic-ai/claude-code
```

You will see a warning like this — **this is normal, ignore it:**

```
npm warn allow-scripts   @anthropic-ai/claude-code@2.x.x (postinstall: node install.cjs)
```

After it finishes, verify it worked:

```
claude --version
```

You should see a version number. If you get `claude is not recognized`, close PowerShell, open a fresh one, and try again.

---

## Step 6 — Clone the repo

```
cd C:\Users\YOUR_NAME_HERE
git clone https://github.com/BoxerBrawlerrrr/djursholmsgrillen.git
cd djursholmsgrillen
```

Replace `YOUR_NAME_HERE` with your actual Windows username (the name of your user folder).

---

## Step 7 — Launch Claude Code

```
claude
```

It will open in your browser and ask you to log in with an Anthropic account. Create one at https://claude.ai if you don't have one.

Once logged in, you're in. Claude Code reads the `CLAUDE.md` file in the repo automatically — it already knows everything about the project.

---

## Common errors

**"winget is not recognized"**
→ Your Windows is too old or winget isn't installed. Download Node directly from https://nodejs.org and install it manually.

**"npm is not recognized"**
→ You didn't restart after installing Node. Restart and try again.

**"running scripts is disabled on this system"**
→ You skipped Step 4. Run the `Set-ExecutionPolicy` command and try again.

**"claude is not recognized" after installing**
→ Close PowerShell completely, open a fresh one, and run `claude --version` again.

**The `&&` operator doesn't work**
→ PowerShell doesn't support `&&`. Run commands one at a time.
