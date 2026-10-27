<?php

use App\Http\Controllers\Admin\AdventDoorController as AdminAdventDoorController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\SongRequestController as AdminSongRequestController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LiveFeedController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OnAirEntryController;
use App\Http\Controllers\SongRequestController;
use Illuminate\Support\Facades\Route;

Route::get('/enter', [OnAirEntryController::class, 'show'])->name('onair.entry');
Route::post('/enter', [OnAirEntryController::class, 'unlock'])
    ->middleware('throttle:20,1')
    ->name('onair.entry.unlock');

Route::middleware('onair.entry')->group(function () {
    Route::get('/', HomeController::class)->name('home');
    Route::get('/live', LiveFeedController::class)->name('live');

    Route::post('/songs', [SongRequestController::class, 'store'])
        ->middleware('throttle:20,1')
        ->name('songs.store');

    Route::post('/messages', [MessageController::class, 'store'])
        ->middleware('throttle:10,1')
        ->name('messages.store');
});

Route::redirect('/admin', '/dashboard');

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('dashboard/songs', [AdminSongRequestController::class, 'index'])->name('dashboard.songs');
    Route::get('dashboard/songs/export', [AdminSongRequestController::class, 'export'])->name('dashboard.songs.export');
    Route::delete('dashboard/songs/{songRequest}', [AdminSongRequestController::class, 'destroy'])->name('dashboard.songs.destroy');

    Route::get('dashboard/messages', [AdminMessageController::class, 'index'])->name('dashboard.messages');
    Route::get('dashboard/messages/{message}/preview', [AdminMessageController::class, 'preview'])->name('dashboard.messages.preview');
    Route::get('dashboard/messages/{message}/media', [AdminMessageController::class, 'media'])->name('dashboard.messages.media');
    Route::get('dashboard/messages/{message}/download', [AdminMessageController::class, 'download'])->name('dashboard.messages.download');
    Route::delete('dashboard/messages/{message}', [AdminMessageController::class, 'destroy'])->name('dashboard.messages.destroy');

    Route::get('dashboard/announcement', [AnnouncementController::class, 'edit'])->name('dashboard.announcement');
    Route::post('dashboard/announcement', [AnnouncementController::class, 'update'])->name('dashboard.announcement.update');
    Route::delete('dashboard/announcement', [AnnouncementController::class, 'destroy'])->name('dashboard.announcement.destroy');

    Route::get('dashboard/advent', [AdminAdventDoorController::class, 'index'])->name('dashboard.advent');
    Route::put('dashboard/advent/{adventDoor}', [AdminAdventDoorController::class, 'update'])->name('dashboard.advent.update');
});

require __DIR__.'/settings.php';
