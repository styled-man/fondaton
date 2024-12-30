import os
import random
import heapq
from PIL import Image, ImageTk
import tkinter as tk
from tkinter import filedialog, messagebox

# Step 1: Image Upload and Processing
def split_image(image_path):
    img = Image.open(image_path)
    img = img.resize((300, 300))  # Resize to 300x300 pixels
    output_folder = "output_tiles"
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    tile_size = 100  # Each tile is 100x100
    tiles = []
    for i in range(3):
        for j in range(3):
            left = j * tile_size
            upper = i * tile_size
            right = left + tile_size
            lower = upper + tile_size

            tile = img.crop((left, upper, right, lower))
            tiles.append(tile)
            tile.save(f"{output_folder}/tile_{len(tiles) - 1}.png")

    print("Image successfully split into 3x3 tiles.")
    return tiles

# Step 2: Shuffle Tiles and Solvability Check
def is_solvable(grid):
    flat_grid = [num for row in grid for num in row if num != 0]
    inversions = sum(
        1 for i in range(len(flat_grid)) for j in range(i + 1, len(flat_grid)) if flat_grid[i] > flat_grid[j]
    )
    return inversions % 2 == 0

def shuffle_tiles():
    grid = list(range(1, 9)) + [0]  # 0 represents the blank tile
    while True:
        random.shuffle(grid)
        grid = [grid[i:i + 3] for i in range(0, 9, 3)]
        if is_solvable(grid):
            break
    return grid

# Step 3: A* Algorithm for Solving
def manhattan_distance(state, goal):
    distance = 0
    for i in range(3):
        for j in range(3):
            if state[i][j] != 0:
                x, y = divmod(goal.index(state[i][j]), 3)
                distance += abs(x - i) + abs(y - j)
    return distance

def a_star_solver(start, goal):
    flat_goal = [num for row in goal for num in row]

    def flatten(state):
        return tuple(num for row in state for num in row)

    def neighbors(state):
        for i, row in enumerate(state):
            if 0 in row:
                x, y = i, row.index(0)
                break

        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < 3 and 0 <= ny < 3:
                new_state = [row[:] for row in state]
                new_state[x][y], new_state[nx][ny] = new_state[nx][ny], new_state[x][y]
                yield new_state

    open_set = []
    heapq.heappush(open_set, (0, start, []))
    visited = set()

    while open_set:
        _, current, path = heapq.heappop(open_set)

        if flatten(current) in visited:
            continue

        visited.add(flatten(current))

        if current == goal:
            return path + [current]

        for neighbor in neighbors(current):
            cost = len(path) + 1 + manhattan_distance(neighbor, flat_goal)
            heapq.heappush(open_set, (cost, neighbor, path + [current]))

    return None

# Step 4: GUI Implementation
class PuzzleApp:
    def __init__(self, root):
        self.root = root
        self.root.title("8-Puzzle Game")
        self.tiles = []
        self.grid = []
        self.goal = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
        self.load_ui()

    def load_ui(self):
        self.canvas = tk.Canvas(self.root, width=300, height=300)
        self.canvas.pack()

        self.upload_button = tk.Button(self.root, text="Upload Image", command=self.upload_image)
        self.upload_button.pack(pady=10)

        self.shuffle_button = tk.Button(self.root, text="Shuffle & Solve", command=self.shuffle_and_solve, state=tk.DISABLED)
        self.shuffle_button.pack(pady=10)

    def upload_image(self):
        file_path = filedialog.askopenfilename(filetypes=[("Image Files", "*.png *.jpg *.jpeg")])
        if file_path:
            self.tiles = split_image(file_path)
            self.display_tiles([[1, 2, 3], [4, 5, 6], [7, 8, 0]])
            self.shuffle_button.config(state=tk.NORMAL)

    def display_tiles(self, grid):
        self.canvas.delete("all")
        self.grid = grid

        for i in range(3):
            for j in range(3):
                tile_number = grid[i][j]
                if tile_number != 0:
                    img = ImageTk.PhotoImage(Image.open(f"output_tiles/tile_{tile_number - 1}.png"))
                    self.canvas.create_image(j * 100, i * 100, anchor=tk.NW, image=img)
                    self.canvas.image = img  # Keep reference to avoid garbage collection

    def shuffle_and_solve(self):
        shuffled_grid = shuffle_tiles()
        self.display_tiles(shuffled_grid)

        solution = a_star_solver(shuffled_grid, self.goal)
        if solution:
            for step in solution:
                self.root.after(1000, lambda s=step: self.display_tiles(s))
        else:
            messagebox.showerror("Error", "No solution found!")

# Run the application
if __name__ == "__main__":
    root = tk.Tk()
    app = PuzzleApp(root)
    root.mainloop()
