import { User } from './types';
import { getStudentStatus } from './db';

interface ChatContext {
  user: User;
  message: string;
}

function hasPermission(user: User, permission: string): boolean {
  return user.role.permissions.some(p => p.name === permission);
}

function extractStudentInfo(message: string) {
  const nameMatch = message.match(/([A-Z][a-z]+)\s+([A-Z][a-z]+)/);
  const classMatch = message.match(/(CM[12]|CE[12]|CP)[A-Z]?/i);

  if (!nameMatch || !classMatch) return null;

  return {
    firstName: nameMatch[2],
    lastName: nameMatch[1],
    class: classMatch[0].toUpperCase(),
  };
}

function formatResponse(studentInfo: any): string {
  let response = '';

  if (studentInfo.current_subject) {
    response += `${studentInfo.first_name} ${studentInfo.last_name} est en cours de ${studentInfo.current_subject.name} avec `;
    response += `${studentInfo.current_subject.teacher_first_name} ${studentInfo.current_subject.teacher_last_name}. `;
  }

  if (studentInfo.latest_trip) {
    response += `${studentInfo.first_name} a pris le bus n°${studentInfo.latest_trip.bus_number} `;
    response += `à ${new Date(studentInfo.latest_trip.pickup_time).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })} `;
    response += `et est arrivé(e) à l'école à ${new Date(studentInfo.latest_trip.arrival_time).toLocaleTimeString(
      "fr-FR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}.`;
  }

  return response;
}

export async function processChat({ user, message }: ChatContext): Promise<string> {
  // Default response for unauthorized or unclear requests
  let response = "Je ne peux pas répondre à cette question. Veuillez vérifier vos permissions ou reformuler votre demande.";

  // Extract student information from the message
  const studentInfo = extractStudentInfo(message);

  switch (user.role.name) {
    case 'parent':
      if (message.toLowerCase().includes('où est') || message.toLowerCase().includes('where is')) {
        if (studentInfo) {
          const status = getStudentStatus(studentInfo.firstName, studentInfo.lastName, studentInfo.class);
          if (status) {
            response = formatResponse(status);
          }
        } else {
          response = "Je n'ai pas pu identifier l'élève dans votre question. Pourriez-vous reformuler avec le nom complet de l'élève et sa classe ?";
        }
      }
      break;

    case 'admin':
      if (message.toLowerCase().includes('bus')) {
        response = "Voici les informations sur les bus actuellement en service...";
      } else if (message.toLowerCase().includes('repas')) {
        response = "Voici le rapport des repas du jour...";
      }
      break;

    case 'cook':
      if (message.toLowerCase().includes('menu') || message.toLowerCase().includes('repas')) {
        response = "Menu du jour : Entrée - Salade composée, Plat - Poulet au riz, Dessert - Yaourt, Boisson - Eau";
      } else if (message.toLowerCase().includes('mangé') || message.toLowerCase().includes('eaten')) {
        response = "Voici la liste des élèves ayant déjà mangé aujourd'hui...";
      }
      break;

    case 'driver':
      if (message.toLowerCase().includes('horaire') || message.toLowerCase().includes('schedule')) {
        response = "Voici votre planning de ramassage pour aujourd'hui...";
      }
      break;

    case 'teacher':
      if (message.toLowerCase().includes('présent') || message.toLowerCase().includes('present')) {
        if (studentInfo) {
          response = `Oui, ${studentInfo.firstName} ${studentInfo.lastName} est présent(e) en classe.`;
        } else {
          response = "Je n'ai pas pu identifier l'élève. Veuillez préciser le nom complet.";
        }
      }
      break;
  }

  return response;
}