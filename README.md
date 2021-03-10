This application was developed on 12.02.2021 as a submission for Hackathon Event. Contributors: Peter Kutschera, Minh Chi Nguyen.

# git submodules

This repository uses [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). Please clone this repo with the `--recursive` flag to clone all submodules aswell. An alternative after cloning this repo is `git submodule init && git submodule update`.

# Novatec Avatar Generator Frontend

Angular (11.2) Frontend version for Novatec Avatar Generator offers simple file upload with click or drag and drop. It uses Material Angular and Tailwindcss for styling.

## Installation

`npm install && npm start` will serve at localhost:4200


# Novatec Avatar Generator Backend

The backend is based of U^2 Net, with a Flask server and Image Transformation built on top. The U^2 Net repo can be found at [U^2-Net: Going Deeper with Nested U-Structure for Salient Object Detection](https://github.com/NathanUA/U-2-Net) (Qin et al, Pattern Recognition 2020)

## Installation

- Download the pretrained model [u2net.pth](https://drive.google.com/file/d/1ao1ovG1Qtx4b7EoskHXmi2E9rp5CHLcZ/view)
- Put the file inside the `backend/U-2-Net/saved_models/u2net/` folder, create u2net folder if needed
- Go back to backend folder, install dependencies with pip/pip3  (pip3 for linux/mac)
- Install numpy first by `pip install numpy` and then `pip install -r requirements.txt`. If `pip install -r requirements.txt` results in error, please try installing each package manually in the requirements.txt, this is a known bug when installing numpy.
- Start the server with `python main.py`
