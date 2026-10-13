<?php

use App\Http\Controllers\Admin\AdventDoorController as AdminAdventDoorController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\SongRequestController as AdminSongRequestController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LiveFeedController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\SongRequestController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/live', LiveFeedController::class)->name('live');

Route::post('/songs', [SongRequestController::class, 'store'])
    ->middleware('throttle:20,1')
    ->name('songs.store');

Route::post('/messages', [MessageController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('messages.store');

Route::redirect('/admin', '/dashboard');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('dashboard/songs', [AdminSongRequestController::class, 'index'])->name('dashboard.songs');
    Route::delete('dashboard/songs/{songRequest}', [AdminSongRequestController::class, 'destroy'])->name('dashboard.songs.destroy');

    Route::get('dashboard/messages', [AdminMessageController::class, 'index'])->name('dashboard.messages');
    Route::delete('dashboard/messages/{message}', [AdminMessageController::class, 'destroy'])->name('dashboard.messages.destroy');

    Route::get('dashboard/announcement', [AnnouncementController::class, 'edit'])->name('dashboard.announcement');
    Route::post('dashboard/announcement', [AnnouncementController::class, 'update'])->name('dashboard.announcement.update');

    Route::get('dashboard/advent', [AdminAdventDoorController::class, 'index'])->name('dashboard.advent');
    Route::put('dashboard/advent/{adventDoor}', [AdminAdventDoorController::class, 'update'])->name('dashboard.advent.update');
});

require __DIR__.'/settings.php';
