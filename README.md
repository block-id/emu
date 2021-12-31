# wallet
Digital wallet for managing IDs and user keys.

## Setup
### Backend
```bash
// Create a virtual environment
python3 -m virtualenv ~/.venvs/emu
source ~/.venvs/emu/activate

// Clone repository
git clone https://github.com/block-id/emu.git
cd emu/backend

// Install dependencies
pip install -r requirements.txt

// Start backend
python3 manage.py runserver
```

### Frontend
```bash
cd frontend
npm i
npm run watch
```
