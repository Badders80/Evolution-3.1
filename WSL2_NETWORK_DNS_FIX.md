# WSL2 Network & DNS Configuration Guide

Complete guide to fix WSL2 networking issues and DNS resolution problems, including Supabase CLI installation.

---

## 🪟 Step 1 – Windows Global Configuration

**File Location:** `C:\Users\AB\.wslconfig`

```ini
[wsl2]
# Resource allocation
memory=28GB
processors=6
swap=0

# Virtualization and networking
nestedVirtualization=true
networkingMode=mirrored
```

**After saving:**
1. Close the file
2. Open PowerShell as Administrator
3. Run: `wsl --shutdown`

### Why These Settings?

- **memory/processors/swap**: Controls VM resource allocation
- **nestedVirtualization**: Enables Docker and other virtualization tools
- **networkingMode=mirrored**: Modern networking mode (automatically handles localhost forwarding)

### What Was Removed and Why

**Removed settings** (no longer needed in current WSL):
- `localhostForwarding=true` – Redundant under `networkingMode=mirrored`
- `generateResolvConf=false` – Moved to per-distro `/etc/wsl.conf` (caused "Unknown key" warnings)

---

## 🐧 Step 2 – Ubuntu Internal Configuration

**Inside Ubuntu WSL terminal:**

```bash
sudo nano /etc/wsl.conf
```

**Paste this content:**

```ini
[network]
generateResolvConf = false
```

**Save and exit:**
- Press `Ctrl + O` (save)
- Press `Enter` (confirm)
- Press `Ctrl + X` (exit)

### What This Does

Tells WSL to **stop auto-generating** `/etc/resolv.conf`, giving you full control over DNS configuration.

---

## 🧩 Step 3 – Fix DNS Resolution (The Critical Part)

### Understanding the DNS Lock

**What is the DNS lock?**

When WSL2 starts, Windows automatically:
1. Creates `/etc/resolv.conf` inside Ubuntu
2. Populates it with Windows' internal DNS (e.g., `nameserver 172.30.32.1`)
3. **Locks the file** so Linux cannot modify or delete it

This causes:
- "Operation not permitted" errors when trying to edit DNS
- Network failures if Windows' DNS bridge breaks
- Inability to install tools like Supabase CLI

### The Fix Sequence

**⚠️ IMPORTANT:** The `/etc/wsl.conf` change only takes effect after a full WSL restart.

#### 3.1 – Shutdown WSL Completely

**In PowerShell (not Ubuntu):**

```powershell
wsl --shutdown
```

Make sure **all Ubuntu windows are closed**.

#### 3.2 – Restart WSL

**In PowerShell:**

```powershell
wsl
```

This reloads the new `/etc/wsl.conf` configuration.

#### 3.3 – Replace and Lock DNS File

**Inside Ubuntu:**

```bash
sudo rm -f /etc/resolv.conf
echo -e "nameserver 1.1.1.1\nnameserver 8.8.8.8" | sudo tee /etc/resolv.conf > /dev/null
sudo chattr +i /etc/resolv.conf
```

**What this does:**
- Deletes the Windows-managed DNS file
- Creates a new one with stable public DNS servers (Cloudflare + Google)
- Locks it with `chattr +i` so it cannot be modified (even by Windows)

---

## 🔧 Troubleshooting: "Operation Not Permitted"

If you still get permission errors after `wsl --shutdown`, Windows may be caching the lock.

### Manual Unlock from Windows

#### Option A: PowerShell Method (Recommended)

**Run as Administrator in PowerShell:**

```powershell
wsl --shutdown

# Take ownership of the locked file
takeown /f "\\wsl$\Ubuntu\etc\resolv.conf"
icacls "\\wsl$\Ubuntu\etc\resolv.conf" /grant "%USERNAME%":F /T
```

⚠️ **Note:** If your distro name differs (e.g., `Ubuntu-22.04`), replace `Ubuntu` in the path.

#### Option B: File Explorer Method

1. **Shutdown WSL:** `wsl --shutdown` in PowerShell
2. **Open in File Explorer:** `\\wsl$\Ubuntu\etc`
3. **Find** `resolv.conf`
4. **Right-click** → Properties → Security → Advanced
5. **Change owner** to your Windows user (e.g., `AB`)
6. **Grant** yourself Full Control → Apply → OK
7. **Delete or rename** the file to `resolv.conf.bak`

#### After Unlocking

**Restart WSL and recreate the file:**

```bash
wsl  # In PowerShell

# Inside Ubuntu:
sudo bash -c 'echo -e "nameserver 1.1.1.1\nnameserver 8.8.8.8" > /etc/resolv.conf'
sudo chattr +i /etc/resolv.conf
```

---

## 🚀 Step 4 – Verify Network Connectivity

**Inside Ubuntu:**

```bash
ping google.com
ping cli.supabase.com
```

**Expected output:**
```
64 bytes from 142.250.x.x: icmp_seq=1 ttl=117 time=15.2 ms
```

✅ If you see replies, DNS is working correctly.

---

## 🧰 Step 5 – Install Supabase CLI

**Inside Ubuntu:**

```bash
curl -fsSL https://cli.supabase.com/install.sh | sh
```

This should now complete without network errors.

---

## 📋 Summary of Changes

### Windows Side (`C:\Users\AB\.wslconfig`)
- Modernized settings for current WSL version
- Removed deprecated/redundant keys
- Enabled mirrored networking

### Ubuntu Side (`/etc/wsl.conf`)
- Disabled automatic DNS generation
- Moved from global to per-distro config

### DNS Configuration (`/etc/resolv.conf`)
- Replaced Windows-managed DNS with stable public resolvers
- Locked file to prevent automatic regeneration
- Ensures persistent network connectivity

---

## 🔍 Technical Deep Dive: Why Windows Locks DNS

### The Bind-Mount Mechanism

When WSL2 starts with `generateResolvConf=true` (default):

1. Windows creates `/etc/resolv.conf` as a **bind-mount** from the host
2. The file is owned by the Windows kernel, not the Linux filesystem
3. Even `sudo` cannot override it because it's not a real Linux file
4. Windows regenerates it on every boot

### Why Sudo Fails

```bash
sudo rm -f /etc/resolv.conf
# Error: Operation not permitted
```

This fails because:
- The file is mounted from Windows' filesystem layer
- Linux sees it as read-only at the kernel level
- Only Windows (via WSL shutdown) can unmount it

### The Solution

By setting `generateResolvConf = false`:
- Windows stops creating the bind-mount
- `/etc/resolv.conf` becomes a normal Linux file
- You gain full control with standard Linux permissions

---

## ✅ Final Checklist

- [ ] Updated `C:\Users\AB\.wslconfig`
- [ ] Ran `wsl --shutdown` in PowerShell
- [ ] Created `/etc/wsl.conf` in Ubuntu
- [ ] Ran `wsl --shutdown` again
- [ ] Restarted WSL with `wsl`
- [ ] Replaced `/etc/resolv.conf` with custom DNS
- [ ] Locked DNS file with `chattr +i`
- [ ] Verified with `ping google.com`
- [ ] Installed Supabase CLI successfully

---

## 🎯 Result

Your WSL2 network stack is now:
- ✅ Fixed and persistent
- ✅ DNS will not reset on each boot
- ✅ Supabase CLI and other tools install cleanly
- ✅ No more "Operation not permitted" errors
- ✅ Stable network connectivity

---

## 📚 Additional Resources

- [WSL Configuration Documentation](https://learn.microsoft.com/en-us/windows/wsl/wsl-config)
- [WSL Networking Guide](https://learn.microsoft.com/en-us/windows/wsl/networking)
- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
